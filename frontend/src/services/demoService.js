import { driveService } from './driveService';

export const demoService = {
  seedDemoData: async () => {
    try {
      // Create Sample Folders
      const folder1 = await driveService.createFolder('💼 Work Projects');
      const folder2 = await driveService.createFolder('🎨 Design Assets');
      const folder3 = await driveService.createFolder('📑 Important Documents');

      // Create a dummy file inside Work Projects
      const dummyFile1 = new File(
        ['# Project Roadmap 2026\n\n- Feature A: End-to-end encryption\n- Feature B: Real-time sync engine\n- Feature C: Multi-region storage buckets\n'],
        'Project_Roadmap.md',
        { type: 'text/markdown' }
      );
      await driveService.uploadFile(dummyFile1, folder1.id);

      const dummyFile2 = new File(
        ['Company Budget Report Q4\n\nRevenue: $4,200,000\nExpenses: $1,800,000\nNet Margin: 57%\nStatus: Approved'],
        'Q4_Financial_Summary.txt',
        { type: 'text/plain' }
      );
      await driveService.uploadFile(dummyFile2, folder3.id);

      const dummyFileRoot = new File(
        ['{\n  "appName": "Vaultify",\n  "version": "1.2.0",\n  "encryption": "AES-256",\n  "demoMode": true\n}'],
        'system_config.json',
        { type: 'application/json' }
      );
      await driveService.uploadFile(dummyFileRoot, null);

      return true;
    } catch (err) {
      console.error('Demo seed error:', err);
      return false;
    }
  }
};
