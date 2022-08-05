import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  return {
    ... config,
    lighthouseUrl: 'http://127.0.0.1:7001',
  };
};
