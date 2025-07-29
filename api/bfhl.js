const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
  const inputData = req.body.data;
  if (!inputData || !Array.isArray(inputData)) {
	return res.status(400).json({ is_success: false, error: 'Invalid input' });
  }

  const result = {
	is_success: true,
	user_id: "john_doe_17091999",
	email: "john@xyz.com",
	roll_number: "ABCD123",
	odd_numbers: [],
	even_numbers: [],
	alphabets: [],
	special_characters: [],
	sum: "0",
	concat_string: ""
  };

  let alphaConcat = '';
  let sum = 0;

  for (let item of inputData) {
	const str = item.toString();

	if (/^\d+$/.test(str)) {
	  const num = parseInt(str);
	  sum += num;
	  if (num % 2 === 0) result.even_numbers.push(str);
	  else result.odd_numbers.push(str);
	} else if (/^[a-zA-Z]+$/.test(str)) {
	  result.alphabets.push(str.toUpperCase());
	  alphaConcat += str;
	} else {
	  result.special_characters.push(str);
	}
  }

  result.sum = sum.toString();

  const reversed = alphaConcat.split('').reverse();
  let altCaps = '';
  for (let i = 0; i < reversed.length; i++) {
	altCaps += i % 2 === 0
	  ? reversed[i].toUpperCase()
	  : reversed[i].toLowerCase();
  }
  result.concat_string = altCaps;

  res.status(200).json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
