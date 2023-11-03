const PAT = '8ae143f31a0646c5a73911ac1b85a549';
const USER_ID = 'baser';
const APP_ID = 'smartbrain';
const MODEL_ID = 'face-detection';

const request = (imageUrl) => {
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
  });

  return {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
}

const handleAPIcall = (req, res) => {
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", request(req.body.input))
    .then(response => response.json())
    .then(data => res.json(data.outputs[0].data))
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
    .where({id})
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => {
        res.status(400).json('Unable to get entries');
    });
}

module.exports = {
    handleImage,
    handleAPIcall
};