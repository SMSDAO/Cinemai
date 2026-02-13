import React, { useState } from 'react';
import { createProduction, createShort } from '../services/api';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export const Create: React.FC = () => {
  const [productionTitle, setProductionTitle] = useState('');
  const [productionScript, setProductionScript] = useState('');
  const [productionLoading, setProductionLoading] = useState(false);
  const [productionSuccess, setProductionSuccess] = useState('');
  const [productionError, setProductionError] = useState('');

  const [shortTitle, setShortTitle] = useState('');
  const [shortIdea, setShortIdea] = useState('');
  const [shortLoading, setShortLoading] = useState(false);
  const [shortSuccess, setShortSuccess] = useState('');
  const [shortError, setShortError] = useState('');

  const handleCreateProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductionError('');
    setProductionSuccess('');
    setProductionLoading(true);

    try {
      await createProduction({ title: productionTitle, script: productionScript });
      setProductionSuccess('Production created successfully!');
      setProductionTitle('');
      setProductionScript('');
    } catch (error: any) {
      setProductionError(error.response?.data?.message || 'Failed to create production');
    } finally {
      setProductionLoading(false);
    }
  };

  const handleCreateShort = async (e: React.FormEvent) => {
    e.preventDefault();
    setShortError('');
    setShortSuccess('');
    setShortLoading(true);

    try {
      await createShort({ title: shortTitle, idea: shortIdea });
      setShortSuccess('Short created successfully!');
      setShortTitle('');
      setShortIdea('');
    } catch (error: any) {
      setShortError(error.response?.data?.message || 'Failed to create short');
    } finally {
      setShortLoading(false);
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Create</h1>

      <div className="create-sections">
        <Card className="create-section">
          <h2>🎬 Create Production</h2>
          {productionError && <div className="error">{productionError}</div>}
          {productionSuccess && (
            <div style={{ padding: '1rem', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00F0FF', borderRadius: '8px', marginBottom: '1rem', color: '#00F0FF' }}>
              {productionSuccess}
            </div>
          )}
          <form onSubmit={handleCreateProduction} className="create-form">
            <Input
              label="Title"
              value={productionTitle}
              onChange={setProductionTitle}
              placeholder="My Cinematic Production"
            />
            <Input
              label="Script"
              type="textarea"
              value={productionScript}
              onChange={setProductionScript}
              placeholder="Enter your script here..."
            />
            <Button type="submit" loading={productionLoading}>
              Create Production
            </Button>
          </form>
        </Card>

        <Card className="create-section">
          <h2>🎞 Create Short</h2>
          {shortError && <div className="error">{shortError}</div>}
          {shortSuccess && (
            <div style={{ padding: '1rem', background: 'rgba(0, 240, 255, 0.1)', border: '1px solid #00F0FF', borderRadius: '8px', marginBottom: '1rem', color: '#00F0FF' }}>
              {shortSuccess}
            </div>
          )}
          <form onSubmit={handleCreateShort} className="create-form">
            <Input
              label="Title"
              value={shortTitle}
              onChange={setShortTitle}
              placeholder="My Short"
            />
            <Input
              label="Idea"
              type="textarea"
              value={shortIdea}
              onChange={setShortIdea}
              placeholder="Enter your idea here..."
            />
            <Button type="submit" loading={shortLoading}>
              Create Short
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
