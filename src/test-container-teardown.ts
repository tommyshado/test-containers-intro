import { teardownContainers } from './test-container-setup';

export default async () => {
  await teardownContainers();
};
