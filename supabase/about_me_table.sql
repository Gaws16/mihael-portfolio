-- Run this in the Supabase SQL editor to create the about_me table and seed initial content
create table if not exists public.about_me (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  short_bio text not null,
  skills text not null,
  experience text not null,
  education text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger handle_updated_at
  before update on public.about_me
  for each row
  execute function moddatetime(updated_at);

insert into public.about_me (full_name, short_bio, skills, experience, education)
values (
  'Mihael Gaws',
  'I’m passionate about crafting human-centered digital products that balance thoughtful design with dependable engineering. When I’m not deep in code, you’ll find me exploring new tech, mentoring developers, or sketching the next big idea.',
  'Proficient in modern web technologies including React, Next.js, TypeScript, and Node.js. Experienced with database design, API development, and cloud deployment.',
  'Several years of experience building scalable web applications. Worked on projects ranging from small business websites to large-scale enterprise applications.',
  'Strong foundation in computer science with continuous learning through online courses, documentation, and hands-on project development.'
)
on conflict do nothing;


