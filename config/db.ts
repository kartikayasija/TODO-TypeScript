import mongoose, {ConnectOptions} from 'mongoose';

interface MongoDBConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

export const connectToMongoDB = async ()=> {
  try {
    const options: MongoDBConnectOptions ={
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    await mongoose.connect(process.env.MONGO_URL!,options);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw error;
  }
};
