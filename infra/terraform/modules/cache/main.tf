# Cache Module - Redis ElastiCache
resource "aws_elasticache_subnet_group" "main" {
  name       = "${var.environment}-cinemai-redis-subnet"
  subnet_ids = var.private_subnet_ids

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-cinemai-redis-subnet"
    }
  )
}

resource "aws_security_group" "redis" {
  name_prefix = "${var.environment}-cinemai-redis-"
  vpc_id      = var.vpc_id
  description = "Security group for Redis ElastiCache"

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
    description = "Redis from VPC"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-cinemai-redis-sg"
    }
  )
}

resource "aws_elasticache_cluster" "main" {
  cluster_id           = "${var.environment}-cinemai-redis"
  engine              = "redis"
  engine_version      = "7.0"
  node_type           = var.redis_node_type
  num_cache_nodes     = var.redis_num_cache_nodes
  parameter_group_name = "default.redis7"
  port                = 6379

  subnet_group_name    = aws_elasticache_subnet_group.main.name
  security_group_ids   = [aws_security_group.redis.id]

  snapshot_retention_limit = var.environment == "production" ? 5 : 1
  snapshot_window         = "03:00-05:00"
  maintenance_window      = "mon:05:00-mon:07:00"

  tags = merge(
    var.tags,
    {
      Name = "${var.environment}-cinemai-redis"
    }
  )
}

output "endpoint" {
  description = "Redis endpoint"
  value       = aws_elasticache_cluster.main.cache_nodes[0].address
}

output "port" {
  description = "Redis port"
  value       = aws_elasticache_cluster.main.cache_nodes[0].port
}

output "connection_string" {
  description = "Redis connection string"
  value       = "redis://${aws_elasticache_cluster.main.cache_nodes[0].address}:${aws_elasticache_cluster.main.cache_nodes[0].port}"
  sensitive   = true
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "private_subnet_ids" {
  description = "Private subnet IDs"
  type        = list(string)
}

variable "redis_node_type" {
  description = "ElastiCache node type"
  type        = string
}

variable "redis_num_cache_nodes" {
  description = "Number of cache nodes"
  type        = number
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {}
}
