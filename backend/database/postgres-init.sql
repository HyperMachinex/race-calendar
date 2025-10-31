-- PostgreSQL initialization script for Race Calendar

-- Create categories table (racing series)
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

-- Create events table (racing events)
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

-- Insert default Motorsports categories
INSERT INTO categories (name, color, icon, description, is_default) VALUES
('Formula 1', '#e10600', '🏎️', 'Formula 1 Grand Prix races', TRUE),
('MotoGP', '#ff6600', '🏍️', 'MotoGP motorcycle racing events', TRUE),
('NASCAR', '#ffd700', '🏁', 'NASCAR Cup Series races', TRUE),
('WEC', '#0066cc', '🏆', 'World Endurance Championship', TRUE),
('Rally', '#00a650', '🚗', 'WRC and rally championships', TRUE),
('IndyCar', '#001489', '🏎️', 'IndyCar Series races', TRUE),
('Formula E', '#00aaff', '⚡', 'Formula E electric racing', TRUE),
('Other', '#6b7280', '🏁', 'Other motorsports events', TRUE)
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
