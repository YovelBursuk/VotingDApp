
import * as tf from '@tensorflow/tfjs';

export default class OurModel {
    static predict() {
        const input = tf.tensor([[1, 2], [3, 4]]);
        const model = await tf.loadLayersModel('http://locahost:3000/model.json');
        const output = model.predict(input);
    }
}