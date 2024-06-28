import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
