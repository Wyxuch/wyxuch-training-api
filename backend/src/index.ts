import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Exchange API listening on PORT: ${port}`);
});