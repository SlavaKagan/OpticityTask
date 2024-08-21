import app from './app';
import { initializeDatabase } from './database/connection';

const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});