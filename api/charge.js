const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.post(
      'https://online.yoco.com/v1/charges/',
      {
        token: req.body.token,
        amountInCents: req.body.amountInCents,
        currency: 'ZAR'
      },
      {
        headers: {
          'X-Auth-Secret-Key': process.env.YOCO_SECRET_KEY
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
