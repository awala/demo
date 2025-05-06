import React, { useState, useEffect } from 'react';
import { listKnowledge, createKnowledge, deleteKnowledge } from '../../api/knowledge';
import { KnowledgeItem } from '../../models/knowledge';
import KnowledgeList from './KnowledgeList';
import KnowledgeDetail from './KnowledgeDetail';
import KnowledgeForm from './KnowledgeForm';

const KnowledgePanel: React.FC = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadKnowledge = async () => {
      setLoading(true);
      try {
        const response = await listKnowledge();
        setItems(response.data);
        if (response.data.length > 0 && !selectedId) {
          setSelectedId(response.data[0].id);
        }
      } catch (error) {
        console.error('Failed to load knowledge items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadKnowledge();
  }, []);

  const handleCreate = async (formData: Parameters<typeof createKnowledge>[0]) => {
    try {
      const response = await createKnowledge(formData);
      setItems(prev => [response.item, ...prev]);
      setSelectedId(response.item.id);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create knowledge item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteKnowledge(id);
      setItems(prev => prev.filter(item => item.id !== id));
      if (selectedId === id) {
        setSelectedId(items[0]?.id ?? null);
      }
    } catch (error) {
      console.error('Failed to delete knowledge item:', error);
    }
  };

  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <div className="flex h-full">
      <div className="w-1/3 border-r border-gray-200">
        <KnowledgeList
          items={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onOpenCreate={() => setShowForm(true)}
          loading={loading}
        />
      </div>
      
      <div className="w-2/3">
        {showForm ? (
          <KnowledgeForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <KnowledgeDetail
            item={selectedItem}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default KnowledgePanel;