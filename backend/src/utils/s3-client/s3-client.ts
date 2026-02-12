import {
  S3Client as AWSS3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

/**
 * S3 Client Utility
 * Handles file uploads and downloads to/from S3 or Cloudflare R2
 */

/**
 * S3 Client for asset storage
 */
export class S3Client {
  private client: AWSS3Client | null = null;
  private bucket: string;
  private region: string;
  private provider: 'aws' | 'r2' | 'mock';

  constructor() {
    this.bucket = process.env.S3_BUCKET || 'cinemai-assets';
    this.region = process.env.S3_REGION || 'us-east-1';
    this.provider = (process.env.STORAGE_PROVIDER as 'aws' | 'r2' | 'mock') || 'mock';

    // Initialize S3 client if credentials are available
    if (this.provider === 'aws' && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      this.client = new AWSS3Client({
        region: this.region,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
      });
    } else if (this.provider === 'r2' && process.env.R2_ACCOUNT_ID && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
      // Cloudflare R2 uses S3-compatible API
      this.client = new AWSS3Client({
        region: 'auto',
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });
    }
    // If no credentials, use mock mode
  }

  /**
   * Upload file to S3
   */
  async upload(key: string, file: Buffer, contentType?: string): Promise<string> {
    if (!this.client) {
      // Mock mode: return fake URL
      return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
    }

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contentType,
    });

    await this.client.send(command);

    // Return public URL
    if (this.provider === 'r2') {
      return `https://${this.bucket}/${key}`;
    }
    return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
  }

  /**
   * Download file from S3
   */
  async download(key: string): Promise<Buffer> {
    if (!this.client) {
      // Mock mode: return empty buffer
      return Buffer.from('');
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    const response = await this.client.send(command);
    const stream = response.Body as any;
    const chunks: Uint8Array[] = [];

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  /**
   * Delete file from S3
   */
  async delete(key: string): Promise<void> {
    if (!this.client) {
      return; // Mock mode: do nothing
    }

    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.client.send(command);
  }

  /**
   * Get signed URL for temporary access
   */
  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    if (!this.client) {
      // Mock mode: return fake signed URL
      return `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}?signed=mock`;
    }

    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    return await getSignedUrl(this.client, command, { expiresIn });
  }

  /**
   * List files with prefix
   */
  async list(prefix: string): Promise<string[]> {
    if (!this.client) {
      return []; // Mock mode: return empty array
    }

    const command = new ListObjectsV2Command({
      Bucket: this.bucket,
      Prefix: prefix,
    });

    const response = await this.client.send(command);
    return (response.Contents || []).map((item) => item.Key || '').filter((key) => key !== '');
  }

  /**
   * Upload avatar (convenience method)
   */
  async uploadAvatar(userId: string, file: Buffer, contentType: string): Promise<string> {
    const key = `avatars/${userId}/${Date.now()}.${contentType.split('/')[1] || 'jpg'}`;
    return await this.upload(key, file, contentType);
  }

  /**
   * Upload asset (convenience method)
   */
  async uploadAsset(type: string, id: string, file: Buffer, contentType: string): Promise<string> {
    const ext = contentType.split('/')[1] || 'bin';
    const key = `assets/${type}/${id}/${Date.now()}.${ext}`;
    return await this.upload(key, file, contentType);
  }
}

/**
 * Create S3 client instance
 */
export function createS3Client(): S3Client {
  return new S3Client();
}
