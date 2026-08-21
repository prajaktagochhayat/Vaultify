import API from './api';

export const driveService = {
  // Folder Operations
  getFolderContents: async (folderId = null) => {
    const url = folderId ? `/folders/${folderId}` : '/folders';
    const response = await API.get(url);
    return response.data;
  },

  createFolder: async (name, parentId = null) => {
    const response = await API.post('/folders', { name, parentId });
    return response.data;
  },

  renameFolder: async (id, name) => {
    const response = await API.put(`/folders/${id}/rename`, { name });
    return response.data;
  },

  moveFolder: async (id, targetFolderId) => {
    const response = await API.put(`/folders/${id}/move`, { targetFolderId });
    return response.data;
  },

  trashFolder: async (id) => {
    await API.put(`/folders/${id}/trash`);
  },

  restoreFolder: async (id) => {
    await API.put(`/folders/${id}/restore`);
  },

  starFolder: async (id) => {
    await API.put(`/folders/${id}/star`);
  },

  // File Operations
  uploadFile: async (file, folderId = null, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folderId) {
      formData.append('folderId', folderId);
    }
    const response = await API.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
    return response.data;
  },

  getFileMetadata: async (id) => {
    const response = await API.get(`/files/${id}`);
    return response.data;
  },

  renameFile: async (id, name) => {
    const response = await API.put(`/files/${id}/rename`, { name });
    return response.data;
  },

  moveFile: async (id, targetFolderId) => {
    const response = await API.put(`/files/${id}/move`, { targetFolderId });
    return response.data;
  },

  trashFile: async (id) => {
    await API.put(`/files/${id}/trash`);
  },

  restoreFile: async (id) => {
    await API.put(`/files/${id}/restore`);
  },

  deleteFilePermanently: async (id) => {
    await API.delete(`/files/${id}`);
  },

  starFile: async (id) => {
    await API.put(`/files/${id}/star`);
  },

  downloadFileUrl: (id) => {
    const token = localStorage.getItem('vaultify_token');
    return `/api/files/${id}/download${token ? '?token=' + token : ''}`;
  },
  
  previewFileUrl: (id) => {
    const token = localStorage.getItem('vaultify_token');
    return `/api/files/${id}/preview${token ? '?token=' + token : ''}`;
  },

  downloadFile: async (id, fileName) => {
    try {
      const response = await API.get(`/files/${id}/download`, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName || 'download');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
    }
  },

  // Views & Search
  getSharedWithMe: async () => {
    const response = await API.get('/shares/shared-with-me');
    return response.data;
  },

  getStarred: async () => {
    const response = await API.get('/starred');
    return response.data;
  },

  getTrash: async () => {
    const response = await API.get('/trash');
    return response.data;
  },

  getActivities: async () => {
    const response = await API.get('/activity');
    return response.data;
  },

  search: async (q, type) => {
    const response = await API.get('/search', { params: { q, type } });
    return response.data;
  },

  // Sharing
  shareItem: async (fileId, folderId, userEmail, role = 'VIEWER') => {
    const response = await API.post('/shares', { fileId, folderId, userEmail, role });
    return response.data;
  },

  createPublicLink: async (fileId, folderId, expiryDays = null, password = null, role = 'VIEWER') => {
    const response = await API.post('/public-links', { fileId, folderId, expiryDays, password, role });
    return response.data;
  },

  getPublicLinkInfo: async (token) => {
    const response = await API.get(`/public-links/${token}`);
    return response.data;
  },

  accessPublicLinkUrl: (token) => `/api/public-links/${token}/access`
};
