import * as toxicity from '@tensorflow-models/toxicity';

export default async function checkUserName(userName){
  // The minimum prediction confidence.

  const threshold = 0.85;

  // Which toxicity labels to return.
  const labelsToInclude = ['toxicity'];

  try {
    const model = await toxicity.load(threshold, labelsToInclude);
    // Now you can use the `model` object to label sentences. 
    return model.classify([userName]).then(predictions => {
      return predictions[0].results[0].match;
    });
  } catch (err) {
    return console.error(err);
  }

}


