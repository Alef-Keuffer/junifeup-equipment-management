-- Seed data for the Equipment Management database

INSERT INTO equipment (name, category, serial_number, status, location, purchase_date) VALUES
('Dell Latitude 5420', 'Laptop', 'SN-LAP-00123', 'Assigned', 'Porto HQ - Floor 1', '2022-03-14'),
('Lenovo ThinkPad T14', 'Laptop', 'SN-LAP-00124', 'Assigned', 'Porto HQ - Floor 2', '2021-11-02'),
('HP EliteBook 840 G8', 'Laptop', 'SN-LAP-00125', 'Available', 'IT Storage Room', '2023-01-19'),
('Apple MacBook Pro 14"', 'Laptop', 'SN-LAP-00126', 'Assigned', 'Marketing Department', '2023-06-30'),
('Dell XPS 13', 'Laptop', 'SN-LAP-00127', 'Maintenance', 'IT Storage Room', '2020-09-05'),
('Lenovo ThinkPad X1 Carbon', 'Laptop', 'SN-LAP-00128', 'Retired', 'Warehouse A', '2018-04-21'),
('Dell Latitude 7320', 'Laptop', 'SN-LAP-00129', 'Available', 'Lisboa Office', '2023-10-11'),
('HP ProBook 450 G9', 'Laptop', 'SN-LAP-00130', 'Assigned', 'Finance Department', '2022-07-08'),

('Dell UltraSharp U2422H', 'Monitor', 'SN-MON-00231', 'Assigned', 'Porto HQ - Floor 1', '2022-02-17'),
('LG 27UL850', 'Monitor', 'SN-MON-00232', 'Available', 'IT Storage Room', '2021-05-26'),
('Samsung Odyssey G5', 'Monitor', 'SN-MON-00233', 'Assigned', 'Marketing Department', '2023-03-02'),
('BenQ PD2700U', 'Monitor', 'SN-MON-00234', 'Maintenance', 'Porto HQ - Floor 2', '2020-12-15'),
('AOC 24G2', 'Monitor', 'SN-MON-00235', 'Retired', 'Warehouse A', '2017-08-09'),
('Dell P2419H', 'Monitor', 'SN-MON-00236', 'Available', 'Lisboa Office', '2023-09-01'),
('LG UltraWide 29WN600', 'Monitor', 'SN-MON-00237', 'Assigned', 'Finance Department', '2022-11-27'),

('Apple iPhone 13', 'Smartphone', 'SN-PHN-00341', 'Assigned', 'Marketing Department', '2022-04-12'),
('Samsung Galaxy S22', 'Smartphone', 'SN-PHN-00342', 'Assigned', 'Porto HQ - Floor 1', '2022-08-19'),
('Samsung Galaxy A54', 'Smartphone', 'SN-PHN-00343', 'Available', 'IT Storage Room', '2023-07-04'),
('Apple iPhone SE (2022)', 'Smartphone', 'SN-PHN-00344', 'Retired', 'Warehouse A', '2019-02-28'),
('Xiaomi Redmi Note 12', 'Smartphone', 'SN-PHN-00345', 'Maintenance', 'Lisboa Office', '2021-10-06'),
('Apple iPhone 14', 'Smartphone', 'SN-PHN-00346', 'Assigned', 'Finance Department', '2023-11-20'),

('Apple iPad Air (5th Gen)', 'Tablet', 'SN-TAB-00451', 'Assigned', 'Marketing Department', '2022-06-13'),
('Samsung Galaxy Tab S8', 'Tablet', 'SN-TAB-00452', 'Available', 'IT Storage Room', '2023-02-09'),
('Apple iPad Pro 11"', 'Tablet', 'SN-TAB-00453', 'Assigned', 'Porto HQ - Floor 2', '2021-09-23'),
('Lenovo Tab P11', 'Tablet', 'SN-TAB-00454', 'Retired', 'Warehouse A', '2018-12-01'),

('HP LaserJet Pro M404dn', 'Printer', 'SN-PRN-00561', 'Assigned', 'Porto HQ - Floor 1', '2020-05-18'),
('Epson EcoTank L3250', 'Printer', 'SN-PRN-00562', 'Available', 'Reception', '2023-04-27'),
('Brother HL-L2350DW', 'Printer', 'SN-PRN-00563', 'Maintenance', 'Finance Department', '2019-07-15'),
('Canon imageCLASS MF445dw', 'Printer', 'SN-PRN-00564', 'Assigned', 'Lisboa Office', '2021-01-30'),

('Cisco Catalyst 2960', 'Network Equipment', 'SN-NET-00671', 'Assigned', 'Server Room', '2019-03-11'),
('TP-Link Archer AX73', 'Network Equipment', 'SN-NET-00672', 'Available', 'IT Storage Room', '2022-10-05'),
('Ubiquiti UniFi Switch 24', 'Network Equipment', 'SN-NET-00673', 'Assigned', 'Server Room', '2021-06-22'),
('Netgear GS308', 'Network Equipment', 'SN-NET-00674', 'Retired', 'Warehouse A', '2017-11-14');
