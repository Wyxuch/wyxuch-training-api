import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 3000;

console.log(process.env.PORT);

app.listen(port, () => {
    console.log(`Exchange API listening on PORT: ${port}`);
});