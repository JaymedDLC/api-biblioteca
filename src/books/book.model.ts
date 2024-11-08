import mongoose, { Document, Schema } from 'mongoose';

interface IReservation {
    userId: string;
    reservationDate: Date;
    returnDate?: Date;
}

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publisher: string;
    publishedDate: Date;
    available: boolean;
    active: boolean;
    reservations: IReservation[];
}

const reservationSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    reservationDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
});

const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publisher: { type: String },
    publishedDate: { type: Date },
    available: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    reservations: [reservationSchema],
});

export default mongoose.model<IBook>('Book', bookSchema);
