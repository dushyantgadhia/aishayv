import LegacyStorage from '@react-native-community/async-storage-backend-legacy';
import AsyncStorageFactory from '@react-native-community/async-storage';

type MyModel = {
  test: string;
};

const legacyStorage = new LegacyStorage();

const storage = AsyncStorageFactory.create<any>(legacyStorage, {});

export default storage;
