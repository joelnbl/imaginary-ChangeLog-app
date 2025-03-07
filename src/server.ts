import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {       
    console.log(`listen on http://localhost:${PORT}/`);
});

export default app