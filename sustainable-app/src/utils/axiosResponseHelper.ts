import { AxiosResponse } from 'axios';
interface Options {
  data?: any;
  status?: number;
  isUpdate?: boolean;
}
export const response = (options: Options = {}): AxiosResponse => {
  const isUpdate = !!options.isUpdate;
  let data;
  if (!options.data) {
    data = defaultData;
  } else if (typeof options.data === 'object' && !Array.isArray(options.data)) {
    if (isUpdate) {
      delete options.data.updatedAt;
    }
    data = { ...defaultData, ...options.data };
  } else if (
    Array.isArray(options.data) &&
    typeof options.data[0] === 'object' &&
    !Array.isArray(options.data[0])
  ) {
    data = options.data.map((element: any) => {
      return { ...defaultData, ...element };
    });
  } else {
    data = options.data;
  }
  const status = options.status === undefined ? 200 : options.status;
  return {
    data,
    status,
    statusText: 'statusText',
    headers: {},
    config: {},
  };
};

const defaultData = {
  id: (Math.floor(Math.random() * 100000) + 1).toString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
