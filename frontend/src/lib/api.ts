import type { FeatureRequest, Vote } from '@/types';

const API_BASE = 'http://localhost:3000';

export const api = {
  featureRequests: {
    getAll: async (): Promise<FeatureRequest[]> => {
      const res = await fetch(`${API_BASE}/feature-requests`);
      if (!res.ok) throw new Error('Failed to fetch feature requests');
      return res.json();
    },

    getOne: async (id: string): Promise<FeatureRequest> => {
      const res = await fetch(`${API_BASE}/feature-requests/${id}`);
      if (!res.ok) throw new Error('Failed to fetch feature request');
      return res.json();
    },

    create: async (data: { title: string; description: string; userId: string }): Promise<FeatureRequest> => {
      const res = await fetch(`${API_BASE}/feature-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create feature request');
      return res.json();
    },

    getCompletedLastMonth: async (): Promise<FeatureRequest[]> => {
      const res = await fetch(`${API_BASE}/feature-requests/completed/last-calendar-month`);
      if (!res.ok) throw new Error('Failed to fetch completed requests');
      return res.json();
    },
  },

  votes: {
    create: async (data: { userId: string; featureRequestId: string }): Promise<Vote> => {
      const res = await fetch(`${API_BASE}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to create vote');
      return res.json();
    },

    delete: async (id: string): Promise<void> => {
      const res = await fetch(`${API_BASE}/votes/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete vote');
    },

    getByUserAndRequest: async (userId: string, featureRequestId: string): Promise<Vote | null> => {
      const res = await fetch(`${API_BASE}/votes?userId=${userId}&featureRequestId=${featureRequestId}`);
      if (!res.ok) return null;
      const votes = await res.json();
      return votes[0] || null;
    },
  },
};
