-- ============================================================
-- Creator Hub — Supabase Schema + Seed Data
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Tables
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT '#fff1f2',
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  description TEXT,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security — allow all (no auth required)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_all" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "public_all" ON links FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Seed: Categories
-- ============================================================
INSERT INTO categories (name, icon, color, position) VALUES
  ('Street Interviews', '🎤', '#fff1f2', 0),
  ('UGC',              '📱', '#fdf4ff', 1),
  ('Product Demo',     '🛍️', '#fff7ed', 2),
  ('Bestie',           '💕', '#fdf2f8', 3),
  ('Others / etc',    '🎬', '#f0fdf4', 4);

-- ============================================================
-- Seed: Street Interviews (5 links)
-- ============================================================
WITH cat AS (SELECT id FROM categories WHERE name = 'Street Interviews')
INSERT INTO links (category_id, url, description, position)
SELECT cat.id, url, description, pos FROM cat, (VALUES
  ('https://www.instagram.com/reel/DW6imSeiCbA/?igsh=MTRxeXVxbWw1aTBsbA==', 'Walking past the booth increases % of problems, walking back decreases', 0),
  ('https://www.instagram.com/reel/DWdcjHYDd28/?igsh=ZncyeTdwcnZwaTlm',    'Popsicle is $8 but customer only has $7, so seller licks it before giving', 1),
  ('https://www.instagram.com/reel/DYYjN_qp5r1/?igsh=MXVhZTAwdWYweXd1ZQ==', 'Really hot guy/girl giving out popsicles or whip creams', 2),
  ('https://www.instagram.com/reel/DXhBXnSDI5e/?igsh=MWJ6c2hqYTJwdnB1MQ==', 'Great video to do — our booth is very colorful', 3),
  ('https://www.instagram.com/reel/DVtULSJCMij/?igsh=MXZwajVnaDN0cTFyNA==', 'Polaroids — beach goers showing how to blow/lick popsicles the hottest way', 4)
) AS t(url, description, pos);

-- ============================================================
-- Seed: UGC (2 links)
-- ============================================================
WITH cat AS (SELECT id FROM categories WHERE name = 'UGC')
INSERT INTO links (category_id, url, description, position)
SELECT cat.id, url, description, pos FROM cat, (VALUES
  ('https://www.instagram.com/reel/DYfERjDxdcK/?igsh=MWdrcGlseXFhazlvZQ==',                              'Ask a 3rd party creator/team to create content saying coolest thing in MSW', 0),
  ('https://www.instagram.com/reel/DYfwtx_BO-8/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ==', 'Found this from our IG mentions', 1)
) AS t(url, description, pos);

-- ============================================================
-- Seed: Product Demo (7 links)
-- ============================================================
WITH cat AS (SELECT id FROM categories WHERE name = 'Product Demo')
INSERT INTO links (category_id, url, description, position)
SELECT cat.id, url, description, pos FROM cat, (VALUES
  ('https://www.instagram.com/reel/DWeAywEkUtG/?igsh=ZGpwN3h0b2k4c2I2',    'Its just a popsicle/booth — are you sure?', 0),
  ('https://www.instagram.com/reel/DYe7BpWv5hz/?igsh=MWlsbmd1czNiMXpvZw==', 'Don''t eat your popsicle like this, do this instead', 1),
  ('https://www.instagram.com/reel/DYCDwu_Tc6F/?igsh=Mzc2OGp3NXdvaTB5',    'Girl grip carrying all merch — make many variations for different products', 2),
  ('https://www.instagram.com/reel/DYM0IQlS9GI/?igsh=dWtueTJzdHYyejNh',    'This will be soooo good — want some popsicles?', 3),
  ('https://www.instagram.com/reel/DXlvPazDUIS/?igsh=ODlyNGZwZzh6bzJ6',    'Wind took you to Miami while carrying the merch and products', 4),
  ('https://www.instagram.com/reel/DYNLchRgibB/?igsh=ZWFkdnFsZ2dkaXA0',    'Fits our models alot — TOP 1 recommendation', 5),
  ('https://www.instagram.com/reel/DXJqTL8CrL4/?igsh=MTkxZ3MxeDU3Yjgxbw==', 'Slow zoom to models — striking balance between marketing and beauty shots', 6)
) AS t(url, description, pos);

-- ============================================================
-- Seed: Others / etc (3 links)
-- ============================================================
WITH cat AS (SELECT id FROM categories WHERE name = 'Others / etc')
INSERT INTO links (category_id, url, description, position)
SELECT cat.id, url, description, pos FROM cat, (VALUES
  ('https://www.instagram.com/reel/DK0zs0yqUxD/?igsh=MWszZzJqZWg1czA5ZQ==', 'Just a mood video', 0),
  ('https://www.instagram.com/reel/DU82fJhAAGY/?igsh=dWY3b2t0ZGxqZmFr',     'Another mood video', 1),
  ('https://www.instagram.com/p/DYSiMO_ESbc/?igsh=bmJ2cGZ3emthdWg2',         'Just another moodboard', 2)
) AS t(url, description, pos);
