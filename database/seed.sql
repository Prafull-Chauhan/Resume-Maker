USE `doc_app_db`;

INSERT INTO `users` (`id`, `full_name`, `email`, `password_hash`, `role`) VALUES
(1, 'System Administrator', 'admin@example.com', '$2a$10$w8T0MhN6tT9d3BwJ8sVf2u5Y.i1eA8p6Gz0x.H5uL4K3R2M1W0uZy', 'admin'),
(2, 'Senior Reviewer', 'reviewer@example.com', '$2a$10$w8T0MhN6tT9d3BwJ8sVf2u5Y.i1eA8p6Gz0x.H5uL4K3R2M1W0uZy', 'reviewer'),
(3, 'John Doe', 'john.doe@example.com', '$2a$10$w8T0MhN6tT9d3BwJ8sVf2u5Y.i1eA8p6Gz0x.H5uL4K3R2M1W0uZy', 'user');

INSERT INTO `templates` (`id`, `name`, `category`, `description`, `layout_template`, `created_by`) VALUES
(1, 'Official Certificate of Completion', 'Education', 'Standard certificate awarded for completing training or academic programs.', 
 '<h1>Certificate of Completion</h1><p>This certifies that <strong>{{applicant_name}}</strong> has successfully completed the program <strong>{{course_title}}</strong> on <strong>{{completion_date}}</strong> with grade <strong>{{grade}}</strong>.</p><p>Authorized Signature: <em>{{authority_name}}</em></p>', 1),
(2, 'Employment Verification Letter', 'Corporate', 'Formal letter verifying employment status, role, and salary.', 
 '<h2>Employment Verification</h2><p>Date: {{issue_date}}</p><p>To Whom It May Concern,</p><p>This letter is to confirm that <strong>{{employee_name}}</strong> is currently employed with us as a <strong>{{job_title}}</strong> in the <strong>{{department}}</strong> department, active since <strong>{{start_date}}</strong>.</p><p>Regards,<br><strong>{{hr_manager}}</strong></p>', 1);

INSERT INTO `template_fields` (`template_id`, `field_name`, `field_label`, `field_type`, `is_required`, `default_value`, `order_index`) VALUES
(1, 'applicant_name', 'Applicant Full Name', 'text', 1, '', 1),
(1, 'course_title', 'Course / Program Name', 'text', 1, 'Full-Stack Web Engineering', 2),
(1, 'completion_date', 'Completion Date', 'date', 1, '2026-08-15', 3),
(1, 'grade', 'Final Grade', 'text', 0, 'A+', 4),
(1, 'authority_name', 'Issuing Authority', 'text', 1, 'Registrar Office', 5),
(2, 'employee_name', 'Employee Full Name', 'text', 1, '', 1),
(2, 'job_title', 'Designation / Title', 'text', 1, 'Software Engineer', 2),
(2, 'department', 'Department', 'text', 1, 'Product Engineering', 3),
(2, 'start_date', 'Joining Date', 'date', 1, '2024-01-10', 4),
(2, 'hr_manager', 'HR Manager Name', 'text', 1, 'HR Director', 5);

INSERT INTO `applications` (`id`, `user_id`, `title`, `category`, `status`, `priority`, `form_data`, `reviewer_notes`, `reviewed_by`) VALUES
(1, 3, 'Course Completion Certificate - Advanced Web Systems', 'Education', 'approved', 'high', 
 '{"applicant_name": "John Doe", "course_title": "Advanced Web Systems", "completion_date": "2026-08-01", "grade": "Distinction", "authority_name": "Dr. Alan Carter"}', 'All requirements verified and approved.', 2),
(2, 3, 'Employment Letter Request for Visa Processing', 'Corporate', 'in_review', 'medium', 
 '{"employee_name": "John Doe", "job_title": "Full Stack Developer", "department": "Tech Labs", "start_date": "2024-03-01", "hr_manager": "Emily Stone"}', 'Pending department lead sign-off.', 2);

INSERT INTO `documents` (`id`, `application_id`, `template_id`, `user_id`, `title`, `doc_type`, `content_body`, `status`) VALUES
(1, 1, 1, 3, 'Certificate - John Doe - Advanced Web Systems', 'Certificate', 
 '<div style="border:2px solid #2563eb; padding:25px; font-family:sans-serif;"><h1>Certificate of Completion</h1><p>This certifies that <strong>John Doe</strong> has successfully completed the program <strong>Advanced Web Systems</strong> on <strong>2026-08-01</strong> with grade <strong>Distinction</strong>.</p><p>Authorized Signature: <em>Dr. Alan Carter</em></p></div>', 'generated');