
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar NOT NULL,
  `created_at` date,
  `updated_at` date
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1;

insert into `users`(`id`, `name`, `username`, `password`) values ('1', 'Test', 'test', '123')
