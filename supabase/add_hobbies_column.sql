-- Add hobbies column to about_me table
-- Run this in the Supabase SQL editor

alter table public.about_me
add column if not exists hobbies text;

-- Update existing rows with default hobbies content if needed
update public.about_me
set hobbies = 'In my free time, I like to go hiking and I also participate in trail running races.'
where hobbies is null or hobbies = '';

