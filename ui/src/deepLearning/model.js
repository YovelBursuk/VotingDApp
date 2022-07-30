
import * as tf from '@tensorflow/tfjs';

export default class OurModel {
    static predict(political_tendancy, economical_tendancy, social_tendancy, religious_tendancy, environment_friendly) {
        const tf = require("@tensorflow/tfjs");
        const tfn = require("@tensorflow/tfjs-node");
        const handler = tfn.io.fileSystem("./tfjs/model.json");
        const model = await tf.loadLayersModel(handler);


        const input = tf.tensor([[political_tendancy, economical_tendancy, social_tendancy, religious_tendancy, 
            environment_friendly]]);
        // const model = await tf.loadLayersModel('http://locahost:3000/model.json');

        const output = model.predict(input);
        const selected = output.argMax();
    }
}