/**
 * Array to store logs
 */
const _log: any[] = [];
const Logger = () => {
  const logger_ = {
    add: (data: any) => {
      _log.push(data);
    },
    get: () => {
      return _log.slice(0);
    }
  };

  return logger_;
};
export default Logger;
