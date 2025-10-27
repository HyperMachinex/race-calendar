-- PostgreSQL initialization script

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    color VARCHAR(7) NOT NULL,
    icon VARCHAR(10),
    description VARCHAR(200),
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    location VARCHAR(200),
    color VARCHAR(7),
    is_all_day BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_date_category ON events(date, category_id);

-- Insert default categories
INSERT INTO categories (name, color, icon, description, is_default) VALUES
('EPL', '#8b5cf6', '⚽', 'English Premier League events', TRUE),
('Personal', '#3b82f6', '👤', 'Personal events and appointments', TRUE),
('Work', '#f97316', '💼', 'Work-related events and meetings', TRUE),
('Holiday', '#10b981', '🎉', 'Holidays and celebrations', TRUE),
('Birthday', '#ec4899', '🎂', 'Birthday celebrations', TRUE),
('Meeting', '#6366f1', '📅', 'Meetings and conferences', TRUE),
('Reminder', '#f59e0b', '⏰', 'Important reminders', TRUE),
('Other', '#14b8a6', '📌', 'Other events', TRUE)
ON CONFLICT (name) DO NOTHING;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
