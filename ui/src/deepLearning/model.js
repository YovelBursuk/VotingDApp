
import * as tf from '@tensorflow/tfjs';
import modelJson from './model.json'

export default class OurModel {
    async predict(political_tendancy, economical_tendancy, social_tendancy, religious_tendancy, environment_friendly) {
        const str = JSON.stringify(modelJson);
        const bytes = new TextEncoder().encode(str);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        const handler = tf.io.browserFiles([blob])       
        const model = await tf.loadLayersModel(handler)

        const input = tf.tensor([[political_tendancy, economical_tendancy, social_tendancy, religious_tendancy, 
            environment_friendly]]);

        let output = await model.predict(input);
        output = await output.array()
        output = output[0]
        const selected = output.indexOf(Math.max.apply(null, output));
        return selected
    }
}