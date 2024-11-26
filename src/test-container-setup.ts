import { StartedTestContainer, GenericContainer } from 'testcontainers';

let postgresContainer: StartedTestContainer;

export default async () => {
    // Start the PostgreSQL container
    postgresContainer = await new GenericContainer('postgres')
        .withEnvironment({ POSTGRES_USER: 'neondb_owner' }) // Username
        .withEnvironment({ POSTGRES_PASSWORD: 'VhHEA42yfOTG' }) // Password
        .withEnvironment({ POSTGRES_DB: 'neondb' }) // Database
        .withExposedPorts(5432) // Exposing the PostgreSQL port
        .start();

    // Export the environment variables for your tests
    process.env.POSTGRES_HOST = postgresContainer.getHost();
    process.env.POSTGRES_PORT = postgresContainer.getMappedPort(5432).toString();
};

export const teardownContainers = async () => {
  await postgresContainer.stop();
};
