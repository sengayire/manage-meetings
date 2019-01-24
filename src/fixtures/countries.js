const countries = [
  {
    code: 'AF', id: '1', name: 'Afghanistan', timeZone: 'Asia/Kabul', offset: 'UTC +04:30',
  },
  {
    code: 'AX', id: '2', name: 'Aland Islands', timeZone: 'Europe/Mariehamn', offset: 'UTC +02:00',
  },
  {
    code: 'AL', id: '3', name: 'Albania', timeZone: 'Europe/Tirane', offset: 'UTC +01:00',
  },
  {
    code: 'DZ', id: '4', name: 'Algeria', timeZone: 'Africa/Algiers', offset: 'UTC +01:00',
  },
  {
    code: 'AS', id: '5', name: 'American Samoa', timeZone: 'Pacific/Pago_Pago', offset: 'UTC -11:00',
  },
  {
    code: 'AD', id: '6', name: 'Andorra', timeZone: 'Europe/Andorra', offset: 'UTC +01:00',
  },
  {
    code: 'AO', id: '7', name: 'Angola', timeZone: 'Africa/Luanda', offset: 'UTC +01:00',
  },
  {
    code: 'AI', id: '8', name: 'Anguilla', timeZone: 'America/Anguilla', offset: 'UTC -04:00',
  },
  {
    code: 'AQ', id: '9', name: 'Antarctica', timeZone: 'Antarctica/Casey', offset: 'UTC +08:00',
  },
  {
    code: 'AG', id: '10', name: 'Antigua and Barbuda', timeZone: 'America/Antigua', offset: 'UTC -04:00',
  },
  {
    code: 'AR', id: '11', name: 'Argentina', timeZone: 'America/Argentina/Buenos_Aires', offset: 'UTC -03:00',
  },
  {
    code: 'AM', id: '12', name: 'Armenia', timeZone: 'Asia/Yerevan', offset: 'UTC +04:00',
  },
  {
    code: 'AW', id: '13', name: 'Aruba', timeZone: 'America/Aruba', offset: 'UTC -04:00',
  },
  {
    code: 'AU', id: '14', name: 'Australia', timeZone: 'Antarctica/Macquarie', offset: 'UTC +11:00',
  },
  {
    code: 'AT', id: '15', name: 'Austria', timeZone: 'Europe/Vienna', offset: 'UTC +01:00',
  },
  {
    code: 'AZ', id: '16', name: 'Azerbaijan', timeZone: 'Asia/Baku', offset: 'UTC +04:00',
  },
  {
    code: 'BS', id: '17', name: 'Bahamas', timeZone: 'America/Nassau', offset: 'UTC -05:00',
  },
  {
    code: 'BH', id: '18', name: 'Bahrain', timeZone: 'Asia/Bahrain', offset: 'UTC +03:00',
  },
  {
    code: 'BD', id: '19', name: 'Bangladesh', timeZone: 'Asia/Dhaka', offset: 'UTC +06:00',
  },
  {
    code: 'BB', id: '20', name: 'Barbados', timeZone: 'America/Barbados', offset: 'UTC -04:00',
  },
  {
    code: 'BY', id: '21', name: 'Belarus', timeZone: 'Europe/Minsk', offset: 'UTC +03:00',
  },
  {
    code: 'BE', id: '22', name: 'Belgium', timeZone: 'Europe/Brussels', offset: 'UTC +01:00',
  },
  {
    code: 'BZ', id: '23', name: 'Belize', timeZone: 'America/Belize', offset: 'UTC -06:00',
  },
  {
    code: 'BJ', id: '24', name: 'Benin', timeZone: 'Africa/Porto-Novo', offset: 'UTC +01:00',
  },
  {
    code: 'BM', id: '25', name: 'Bermuda', timeZone: 'Atlantic/Bermuda', offset: 'UTC -04:00',
  },
  {
    code: 'BT', id: '26', name: 'Bhutan', timeZone: 'Asia/Thimphu', offset: 'UTC +06:00',
  },
  {
    code: 'BO', id: '27', name: 'Bolivia', timeZone: 'America/La_Paz', offset: 'UTC -04:00',
  },
  {
    code: 'BQ', id: '28', name: 'Bonaire, Saint Eustatius and Saba', timeZone: 'America/Kralendijk', offset: 'UTC -04:00',
  },
  {
    code: 'BA', id: '29', name: 'Bosnia and Herzegovina', timeZone: 'Europe/Sarajevo', offset: 'UTC +01:00',
  },
  {
    code: 'BW', id: '30', name: 'Botswana', timeZone: 'Africa/Gaborone', offset: 'UTC +02:00',
  },
  {
    code: 'BR', id: '31', name: 'Brazil', timeZone: 'America/Araguaina', offset: 'UTC -03:00',
  },
  {
    code: 'IO', id: '32', name: 'British Indian Ocean Territory', timeZone: 'Indian/Chagos', offset: 'UTC +06:00',
  },
  {
    code: 'VG', id: '33', name: 'British Virgin Islands', timeZone: 'America/Tortola', offset: 'UTC -04:00',
  },
  {
    code: 'BN', id: '34', name: 'Brunei', timeZone: 'Asia/Brunei', offset: 'UTC +08:00',
  },
  {
    code: 'BG', id: '35', name: 'Bulgaria', timeZone: 'Europe/Sofia', offset: 'UTC +02:00',
  },
  {
    code: 'BF', id: '36', name: 'Burkina Faso', timeZone: 'Africa/Ouagadougou', offset: 'UTC',
  },
  {
    code: 'BI', id: '37', name: 'Burundi', timeZone: 'Africa/Bujumbura', offset: 'UTC +02:00',
  },
  {
    code: 'KH', id: '38', name: 'Cambodia', timeZone: 'Asia/Phnom_Penh', offset: 'UTC +07:00',
  },
  {
    code: 'CM', id: '39', name: 'Cameroon', timeZone: 'Africa/Douala', offset: 'UTC +01:00',
  },
  {
    code: 'CA', id: '40', name: 'Canada', timeZone: 'America/Atikokan', offset: 'UTC -05:00',
  },
  {
    code: 'CV', id: '41', name: 'Cape Verde', timeZone: 'Atlantic/Cape_Verde', offset: 'UTC -01:00',
  },
  {
    code: 'KY', id: '42', name: 'Cayman Islands', timeZone: 'America/Cayman', offset: 'UTC -05:00',
  },
  {
    code: 'CF', id: '43', name: 'Central African Republic', timeZone: 'Africa/Bangui', offset: 'UTC +01:00',
  },
  {
    code: 'TD', id: '44', name: 'Chad', timeZone: 'Africa/Ndjamena', offset: 'UTC +01:00',
  },
  {
    code: 'CL', id: '45', name: 'Chile', timeZone: 'America/Punta_Arenas', offset: 'UTC -03:00',
  },
  {
    code: 'CN', id: '46', name: 'China', timeZone: 'Asia/Shanghai', offset: 'UTC +08:00',
  },
  {
    code: 'CX', id: '47', name: 'Christmas Island', timeZone: 'Indian/Christmas', offset: 'UTC +07:00',
  },
  {
    code: 'CC', id: '48', name: 'Cocos Islands', timeZone: 'Indian/Cocos', offset: 'UTC +06:30',
  },
  {
    code: 'CO', id: '49', name: 'Colombia', timeZone: 'America/Bogota', offset: 'UTC -05:00',
  },
  {
    code: 'KM', id: '50', name: 'Comoros', timeZone: 'Indian/Comoro', offset: 'UTC +03:00',
  },
  {
    code: 'CK', id: '51', name: 'Cook Islands', timeZone: 'Pacific/Rarotonga', offset: 'UTC -10:00',
  },
  {
    code: 'CR', id: '52', name: 'Costa Rica', timeZone: 'America/Costa_Rica', offset: 'UTC -06:00',
  },
  {
    code: 'HR', id: '53', name: 'Croatia', timeZone: 'Europe/Zagreb', offset: 'UTC +01:00',
  },
  {
    code: 'CU', id: '54', name: 'Cuba', timeZone: 'America/Havana', offset: 'UTC -05:00',
  },
  {
    code: 'CW', id: '55', name: 'Curaçao', timeZone: 'America/Curacao', offset: 'UTC -04:00',
  },
  {
    code: 'CY', id: '56', name: 'Cyprus', timeZone: 'Asia/Famagusta', offset: 'UTC +02:00',
  },
  {
    code: 'CZ', id: '57', name: 'Czech Republic', timeZone: 'Europe/Prague', offset: 'UTC +01:00',
  },
  {
    code: 'CD', id: '58', name: 'Democratic Republic of the Congo', timeZone: 'Africa/Kinshasa', offset: 'UTC +01:00',
  },
  {
    code: 'DK', id: '59', name: 'Denmark', timeZone: 'Europe/Copenhagen', offset: 'UTC +01:00',
  },
  {
    code: 'DJ', id: '60', name: 'Djibouti', timeZone: 'Africa/Djibouti', offset: 'UTC +03:00',
  },
  {
    code: 'DM', id: '61', name: 'Dominica', timeZone: 'America/Dominica', offset: 'UTC -04:00',
  },
  {
    code: 'DO', id: '62', name: 'Dominican Republic', timeZone: 'America/Santo_Domingo', offset: 'UTC -04:00',
  },
  {
    code: 'TL', id: '63', name: 'East Timor', timeZone: 'Asia/Dili', offset: 'UTC +09:00',
  },
  {
    code: 'EC', id: '64', name: 'Ecuador', timeZone: 'America/Guayaquil', offset: 'UTC -05:00',
  },
  {
    code: 'EG', id: '65', name: 'Egypt', timeZone: 'Africa/Cairo', offset: 'UTC +02:00',
  },
  {
    code: 'SV', id: '66', name: 'El Salvador', timeZone: 'America/El_Salvador', offset: 'UTC -06:00',
  },
  {
    code: 'GQ', id: '67', name: 'Equatorial Guinea', timeZone: 'Africa/Malabo', offset: 'UTC +01:00',
  },
  {
    code: 'ER', id: '68', name: 'Eritrea', timeZone: 'Africa/Asmara', offset: 'UTC +03:00',
  },
  {
    code: 'EE', id: '69', name: 'Estonia', timeZone: 'Europe/Tallinn', offset: 'UTC +02:00',
  },
  {
    code: 'ET', id: '70', name: 'Ethiopia', timeZone: 'Africa/Addis_Ababa', offset: 'UTC +03:00',
  },
  {
    code: 'FK', id: '71', name: 'Falkland Islands', timeZone: 'Atlantic/Stanley', offset: 'UTC -03:00',
  },
  {
    code: 'FO', id: '72', name: 'Faroe Islands', timeZone: 'Atlantic/Faroe', offset: 'UTC',
  },
  {
    code: 'FJ', id: '73', name: 'Fiji', timeZone: 'Pacific/Fiji', offset: 'UTC +12:00',
  },
  {
    code: 'FI', id: '74', name: 'Finland', timeZone: 'Europe/Helsinki', offset: 'UTC +02:00',
  },
  {
    code: 'FR', id: '75', name: 'France', timeZone: 'Europe/Paris', offset: 'UTC +01:00',
  },
  {
    code: 'GF', id: '76', name: 'French Guiana', timeZone: 'America/Cayenne', offset: 'UTC -03:00',
  },
  {
    code: 'PF', id: '77', name: 'French Polynesia', timeZone: 'Pacific/Gambier', offset: 'UTC -09:00',
  },
  {
    code: 'TF', id: '78', name: 'French Southern Territories', timeZone: 'Indian/Kerguelen', offset: 'UTC +05:00',
  },
  {
    code: 'GA', id: '79', name: 'Gabon', timeZone: 'Africa/Libreville', offset: 'UTC +01:00',
  },
  {
    code: 'GM', id: '80', name: 'Gambia', timeZone: 'Africa/Banjul', offset: 'UTC',
  },
  {
    code: 'GE', id: '81', name: 'Georgia', timeZone: 'Asia/Tbilisi', offset: 'UTC +04:00',
  },
  {
    code: 'DE', id: '82', name: 'Germany', timeZone: 'Europe/Berlin', offset: 'UTC +01:00',
  },
  {
    code: 'GH', id: '83', name: 'Ghana', timeZone: 'Africa/Accra', offset: 'UTC',
  },
  {
    code: 'GI', id: '84', name: 'Gibraltar', timeZone: 'Europe/Gibraltar', offset: 'UTC +01:00',
  },
  {
    code: 'GR', id: '85', name: 'Greece', timeZone: 'Europe/Athens', offset: 'UTC +02:00',
  },
  {
    code: 'GL', id: '86', name: 'Greenland', timeZone: 'America/Danmarkshavn', offset: 'UTC',
  },
  {
    code: 'GD', id: '87', name: 'Grenada', timeZone: 'America/Grenada', offset: 'UTC -04:00',
  },
  {
    code: 'GP', id: '88', name: 'Guadeloupe', timeZone: 'America/Guadeloupe', offset: 'UTC -04:00',
  },
  {
    code: 'GU', id: '89', name: 'Guam', timeZone: 'Pacific/Guam', offset: 'UTC +10:00',
  },
  {
    code: 'GT', id: '90', name: 'Guatemala', timeZone: 'America/Guatemala', offset: 'UTC -06:00',
  },
  {
    code: 'GG', id: '91', name: 'Guernsey', timeZone: 'Europe/Guernsey', offset: 'UTC',
  },
  {
    code: 'GN', id: '92', name: 'Guinea', timeZone: 'Africa/Conakry', offset: 'UTC',
  },
  {
    code: 'GW', id: '93', name: 'Guinea-Bissau', timeZone: 'Africa/Bissau', offset: 'UTC',
  },
  {
    code: 'GY', id: '94', name: 'Guyana', timeZone: 'America/Guyana', offset: 'UTC -04:00',
  },
  {
    code: 'HT', id: '95', name: 'Haiti', timeZone: 'America/Port-au-Prince', offset: 'UTC -05:00',
  },
  {
    code: 'HN', id: '96', name: 'Honduras', timeZone: 'America/Tegucigalpa', offset: 'UTC -06:00',
  },
  {
    code: 'HK', id: '97', name: 'Hong Kong', timeZone: 'Asia/Hong_Kong', offset: 'UTC +08:00',
  },
  {
    code: 'HU', id: '98', name: 'Hungary', timeZone: 'Europe/Budapest', offset: 'UTC +01:00',
  },
  {
    code: 'IS', id: '99', name: 'Iceland', timeZone: 'Atlantic/Reykjavik', offset: 'UTC',
  },
  {
    code: 'IN', id: '100', name: 'India', timeZone: 'Asia/Kolkata', offset: 'UTC +05:30',
  },
  {
    code: 'ID', id: '101', name: 'Indonesia', timeZone: 'Asia/Jakarta', offset: 'UTC +09:00',
  },
  {
    code: 'IR', id: '102', name: 'Iran', timeZone: 'Asia/Tehran', offset: 'UTC +03:30',
  },
  {
    code: 'IQ', id: '103', name: 'Iraq', timeZone: 'Asia/Baghdad', offset: 'UTC +03:00',
  },
  {
    code: 'IE', id: '104', name: 'Ireland', timeZone: 'Europe/Dublin', offset: 'UTC',
  },
  {
    code: 'IM', id: '105', name: 'Isle of Man', timeZone: 'Europe/Isle_of_Man', offset: 'UTC',
  },
  {
    code: 'IL', id: '106', name: 'Israel', timeZone: 'Asia/Jerusalem', offset: 'UTC +02:00',
  },
  {
    code: 'IT', id: '107', name: 'Italy', timeZone: 'Europe/Rome', offset: 'UTC +01:00',
  },
  {
    code: 'CI', id: '108', name: 'Ivory Coast', timeZone: 'Africa/Abidjan', offset: 'UTC',
  },
  {
    code: 'JM', id: '109', name: 'Jamaica', timeZone: 'America/Jamaica', offset: 'UTC -05:00',
  },
  {
    code: 'JP', id: '110', name: 'Japan', timeZone: 'Asia/Tokyo', offset: 'UTC +09:00',
  },
  {
    code: 'JE', id: '111', name: 'Jersey', timeZone: 'Europe/Jersey', offset: 'UTC',
  },
  {
    code: 'JO', id: '112', name: 'Jordan', timeZone: 'Asia/Amman', offset: 'UTC +02:00',
  },
  {
    code: 'KZ', id: '113', name: 'Kazakhstan', timeZone: 'Asia/Almaty', offset: 'UTC +06:00',
  },
  {
    code: 'KE', id: '114', name: 'Kenya', timeZone: 'EAST_AFRICA_TIME', offset: 'UTC +03:00',
  },
  {
    code: 'KI', id: '115', name: 'Kiribati', timeZone: 'Pacific/Enderbury', offset: 'UTC +13:00',
  },
  {
    code: 'KW', id: '116', name: 'Kuwait', timeZone: 'Asia/Kuwait', offset: 'UTC +03:00',
  },
  {
    code: 'KG', id: '117', name: 'Kyrgyzstan', timeZone: 'Asia/Bishkek', offset: 'UTC +06:00',
  },
  {
    code: 'LA', id: '118', name: 'Laos', timeZone: 'Asia/Vientiane', offset: 'UTC +07:00',
  },
  {
    code: 'LV', id: '119', name: 'Latvia', timeZone: 'Europe/Riga', offset: 'UTC +02:00',
  },
  {
    code: 'LB', id: '120', name: 'Lebanon', timeZone: 'Asia/Beirut', offset: 'UTC +02:00',
  },
  {
    code: 'LS', id: '121', name: 'Lesotho', timeZone: 'Africa/Maseru', offset: 'UTC +02:00',
  },
  {
    code: 'LR', id: '122', name: 'Liberia', timeZone: 'Africa/Monrovia', offset: 'UTC',
  },
  {
    code: 'LY', id: '123', name: 'Libya', timeZone: 'Africa/Tripoli', offset: 'UTC +02:00',
  },
  {
    code: 'LI', id: '124', name: 'Liechtenstein', timeZone: 'Europe/Vaduz', offset: 'UTC +01:00',
  },
  {
    code: 'LT', id: '125', name: 'Lithuania', timeZone: 'Europe/Vilnius', offset: 'UTC +02:00',
  },
  {
    code: 'LU', id: '126', name: 'Luxembourg', timeZone: 'Europe/Luxembourg', offset: 'UTC +01:00',
  },
  {
    code: 'MO', id: '127', name: 'Macao', timeZone: 'Asia/Macau', offset: 'UTC +08:00',
  },
  {
    code: 'MK', id: '128', name: 'Macedonia', timeZone: 'Europe/Skopje', offset: 'UTC +01:00',
  },
  {
    code: 'MG', id: '129', name: 'Madagascar', timeZone: 'Indian/Antananarivo', offset: 'UTC +03:00',
  },
  {
    code: 'MW', id: '130', name: 'Malawi', timeZone: 'Africa/Blantyre', offset: 'UTC +02:00',
  },
  {
    code: 'MY', id: '131', name: 'Malaysia', timeZone: 'Asia/Kuala_Lumpur', offset: 'UTC +08:00',
  },
  {
    code: 'MV', id: '132', name: 'Maldives', timeZone: 'Indian/Maldives', offset: 'UTC +05:00',
  },
  {
    code: 'ML', id: '133', name: 'Mali', timeZone: 'Africa/Bamako', offset: 'UTC',
  },
  {
    code: 'MT', id: '134', name: 'Malta', timeZone: 'Europe/Malta', offset: 'UTC +01:00',
  },
  {
    code: 'MH', id: '135', name: 'Marshall Islands', timeZone: 'Pacific/Kwajalein', offset: 'UTC +12:00',
  },
  {
    code: 'MQ', id: '136', name: 'Martinique', timeZone: 'America/Martinique', offset: 'UTC -04:00',
  },
  {
    code: 'MR', id: '137', name: 'Mauritania', timeZone: 'Africa/Nouakchott', offset: 'UTC',
  },
  {
    code: 'MU', id: '138', name: 'Mauritius', timeZone: 'Indian/Mauritius', offset: 'UTC +04:00',
  },
  {
    code: 'YT', id: '139', name: 'Mayotte', timeZone: 'Indian/Mayotte', offset: 'UTC +03:00',
  },
  {
    code: 'MX', id: '140', name: 'Mexico', timeZone: 'America/Bahia_Banderas', offset: 'UTC -06:00',
  },
  {
    code: 'FM', id: '141', name: 'Micronesia', timeZone: 'Pacific/Chuuk', offset: 'UTC +10:00',
  },
  {
    code: 'MD', id: '142', name: 'Moldova', timeZone: 'Europe/Chisinau', offset: 'UTC +02:00',
  },
  {
    code: 'MC', id: '143', name: 'Monaco', timeZone: 'Europe/Monaco', offset: 'UTC +01:00',
  },
  {
    code: 'MN', id: '144', name: 'Mongolia', timeZone: 'Asia/Choibalsan', offset: 'UTC +08:00',
  },
  {
    code: 'ME', id: '145', name: 'Montenegro', timeZone: 'Europe/Podgorica', offset: 'UTC +01:00',
  },
  {
    code: 'MS', id: '146', name: 'Montserrat', timeZone: 'America/Montserrat', offset: 'UTC -04:00',
  },
  {
    code: 'MA', id: '147', name: 'Morocco', timeZone: 'Africa/Casablanca', offset: 'UTC +01:00',
  },
  {
    code: 'MZ', id: '148', name: 'Mozambique', timeZone: 'Africa/Maputo', offset: 'UTC +02:00',
  },
  {
    code: 'MM', id: '149', name: 'Myanmar', timeZone: 'Asia/Yangon', offset: 'UTC +06:30',
  },
  {
    code: 'NA', id: '150', name: 'Namibia', timeZone: 'Africa/Windhoek', offset: 'UTC +02:00',
  },
  {
    code: 'NR', id: '151', name: 'Nauru', timeZone: 'Pacific/Nauru', offset: 'UTC +12:00',
  },
  {
    code: 'NP', id: '152', name: 'Nepal', timeZone: 'Asia/Kathmandu', offset: 'UTC +05:45',
  },
  {
    code: 'NL', id: '153', name: 'Netherlands', timeZone: 'Europe/Amsterdam', offset: 'UTC +01:00',
  },
  {
    code: 'NC', id: '154', name: 'New Caledonia', timeZone: 'Pacific/Noumea', offset: 'UTC +11:00',
  },
  {
    code: 'NZ', id: '155', name: 'New Zealand', timeZone: 'Pacific/Auckland', offset: 'UTC +13:00',
  },
  {
    code: 'NI', id: '156', name: 'Nicaragua', timeZone: 'America/Managua', offset: 'UTC -06:00',
  },
  {
    code: 'NE', id: '157', name: 'Niger', timeZone: 'Africa/Niamey', offset: 'UTC +01:00',
  },
  {
    code: 'NG', id: '158', name: 'Nigeria', timeZone: 'WEST_AFRICA_TIME', offset: 'UTC +01:00',
  },
  {
    code: 'NU', id: '159', name: 'Niue', timeZone: 'Pacific/Niue', offset: 'UTC -11:00',
  },
  {
    code: 'NF', id: '160', name: 'Norfolk Island', timeZone: 'Pacific/Norfolk', offset: 'UTC +11:00',
  },
  {
    code: 'KP', id: '161', name: 'North Korea', timeZone: 'Asia/Pyongyang', offset: 'UTC +09:00',
  },
  {
    code: 'MP', id: '162', name: 'Northern Mariana Islands', timeZone: 'Pacific/Saipan', offset: 'UTC +10:00',
  },
  {
    code: 'NO', id: '163', name: 'Norway', timeZone: 'Europe/Oslo', offset: 'UTC +01:00',
  },
  {
    code: 'OM', id: '164', name: 'Oman', timeZone: 'Asia/Muscat', offset: 'UTC +04:00',
  },
  {
    code: 'PK', id: '165', name: 'Pakistan', timeZone: 'Asia/Karachi', offset: 'UTC +05:00',
  },
  {
    code: 'PW', id: '166', name: 'Palau', timeZone: 'Pacific/Palau', offset: 'UTC +09:00',
  },
  {
    code: 'PS', id: '167', name: 'Palestinian Territory', timeZone: 'Asia/Gaza', offset: 'UTC +02:00',
  },
  {
    code: 'PA', id: '168', name: 'Panama', timeZone: 'America/Panama', offset: 'UTC -05:00',
  },
  {
    code: 'PG', id: '169', name: 'Papua New Guinea', timeZone: 'Pacific/Bougainville', offset: 'UTC +11:00',
  },
  {
    code: 'PY', id: '170', name: 'Paraguay', timeZone: 'America/Asuncion', offset: 'UTC -03:00',
  },
  {
    code: 'PE', id: '171', name: 'Peru', timeZone: 'America/Lima', offset: 'UTC -05:00',
  },
  {
    code: 'PH', id: '172', name: 'Philippines', timeZone: 'Asia/Manila', offset: 'UTC +08:00',
  },
  {
    code: 'PN', id: '173', name: 'Pitcairn', timeZone: 'Pacific/Pitcairn', offset: 'UTC -08:00',
  },
  {
    code: 'PL', id: '174', name: 'Poland', timeZone: 'Europe/Warsaw', offset: 'UTC +01:00',
  },
  {
    code: 'PT', id: '175', name: 'Portugal', timeZone: 'Atlantic/Azores', offset: 'UTC -01:00',
  },
  {
    code: 'PR', id: '176', name: 'Puerto Rico', timeZone: 'America/Puerto_Rico', offset: 'UTC -04:00',
  },
  {
    code: 'QA', id: '177', name: 'Qatar', timeZone: 'Asia/Qatar', offset: 'UTC +03:00',
  },
  {
    code: 'CG', id: '178', name: 'Republic of the Congo', timeZone: 'Africa/Brazzaville', offset: 'UTC +01:00',
  },
  {
    code: 'RE', id: '179', name: 'Reunion', timeZone: 'Indian/Reunion', offset: 'UTC +04:00',
  },
  {
    code: 'RO', id: '180', name: 'Romania', timeZone: 'Europe/Bucharest', offset: 'UTC +02:00',
  },
  {
    code: 'RU', id: '181', name: 'Russia', timeZone: 'Asia/Anadyr', offset: 'UTC +12:00',
  },
  {
    code: 'RW', id: '182', name: 'Rwanda', timeZone: 'EAST_AFRICA_TIME', offset: 'UTC +02:00',
  },
  {
    code: 'BL', id: '183', name: 'Saint Barthelemy', timeZone: 'America/St_Barthelemy', offset: 'UTC -04:00',
  },
  {
    code: 'SH', id: '184', name: 'Saint Helena', timeZone: 'Atlantic/St_Helena', offset: 'UTC',
  },
  {
    code: 'KN', id: '185', name: 'Saint Kitts and Nevis', timeZone: 'America/St_Kitts', offset: 'UTC -04:00',
  },
  {
    code: 'LC', id: '186', name: 'Saint Lucia', timeZone: 'America/St_Lucia', offset: 'UTC -04:00',
  },
  {
    code: 'MF', id: '187', name: 'Saint Martin', timeZone: 'America/Marigot', offset: 'UTC -04:00',
  },
  {
    code: 'PM', id: '188', name: 'Saint Pierre and Miquelon', timeZone: 'America/Miquelon', offset: 'UTC -03:00',
  },
  {
    code: 'VC', id: '189', name: 'Saint Vincent and the Grenadines', timeZone: 'America/St_Vincent', offset: 'UTC -04:00',
  },
  {
    code: 'WS', id: '190', name: 'Samoa', timeZone: 'Pacific/Apia', offset: 'UTC +14:00',
  },
  {
    code: 'SM', id: '191', name: 'San Marino', timeZone: 'Europe/San_Marino', offset: 'UTC +01:00',
  },
  {
    code: 'ST', id: '192', name: 'Sao Tome and Principe', timeZone: 'Africa/Sao_Tome', offset: 'UTC',
  },
  {
    code: 'SA', id: '193', name: 'Saudi Arabia', timeZone: 'Asia/Riyadh', offset: 'UTC +03:00',
  },
  {
    code: 'SN', id: '194', name: 'Senegal', timeZone: 'Africa/Dakar', offset: 'UTC',
  },
  {
    code: 'RS', id: '195', name: 'Serbia', timeZone: 'Europe/Belgrade', offset: 'UTC +01:00',
  },
  {
    code: 'SC', id: '196', name: 'Seychelles', timeZone: 'Indian/Mahe', offset: 'UTC +04:00',
  },
  {
    code: 'SL', id: '197', name: 'Sierra Leone', timeZone: 'Africa/Freetown', offset: 'UTC',
  },
  {
    code: 'SG', id: '198', name: 'Singapore', timeZone: 'Asia/Singapore ', offset: 'UTC +08:00',
  },
  {
    code: 'SX', id: '199', name: 'Sint Maarten', timeZone: 'America/Lower_Princes ', offset: 'UTC -04:00',
  },
  {
    code: 'SK', id: '200', name: 'Slovakia', timeZone: 'Europe/Bratislava ', offset: 'UTC +01:00',
  },
  {
    code: 'SI', id: '201', name: 'Slovenia', timeZone: 'Europe/Ljubljana ', offset: 'UTC +01:00',
  },
  {
    code: 'SB', id: '202', name: 'Solomon Islands', timeZone: 'Pacific/Guadalcanal ', offset: 'UTC +11:00',
  },
  {
    code: 'SO', id: '203', name: 'Somalia', timeZone: 'Africa/Mogadishu ', offset: 'UTC +03:00',
  },
  {
    code: 'ZA', id: '204', name: 'South Africa', timeZone: 'Africa/Johannesburg ', offset: 'UTC +02:00',
  },
  {
    code: 'GS', id: '205', name: 'South Georgia and the South Sandwich Islands', timeZone: 'Atlantic/South_Georgia ', offset: 'UTC -02:00',
  },
  {
    code: 'KR', id: '206', name: 'South Korea', timeZone: 'Asia/Seoul', offset: 'UTC +09:00',
  },
  {
    code: 'SS', id: '207', name: 'South Sudan', timeZone: 'Africa/Juba', offset: 'UTC +03:00',
  },
  {
    code: 'ES', id: '208', name: 'Spain', timeZone: 'Africa/Ceuta', offset: 'UTC +01:00',
  },
  {
    code: 'LK', id: '209', name: 'Sri Lanka', timeZone: 'Asia/Colombo', offset: 'UTC +05:30',
  },
  {
    code: 'SD', id: '210', name: 'Sudan', timeZone: 'Africa/Khartoum', offset: 'UTC +02:00',
  },
  {
    code: 'SR', id: '211', name: 'Suriname', timeZone: 'America/Paramaribo', offset: 'UTC -03:00',
  },
  {
    code: 'SJ', id: '212', name: 'Svalbard and Jan Mayen', timeZone: 'Arctic/Longyearbyen', offset: 'UTC +01:00',
  },
  {
    code: 'SZ', id: '213', name: 'Swaziland', timeZone: 'Africa/Mbabane', offset: 'UTC +02:00',
  },
  {
    code: 'SE', id: '214', name: 'Sweden', timeZone: 'Europe/Stockholm', offset: 'UTC +01:00',
  },
  {
    code: 'CH', id: '215', name: 'Switzerland', timeZone: 'Europe/Zurich', offset: 'UTC +01:00',
  },
  {
    code: 'SY', id: '216', name: 'Syria', timeZone: 'Asia/Damascus', offset: 'UTC +02:00',
  },
  {
    code: 'TW', id: '217', name: 'Taiwan', timeZone: 'Asia/Taipei', offset: 'UTC +08:00',
  },
  {
    code: 'TJ', id: '218', name: 'Tajikistan', timeZone: 'Asia/Dushanbe', offset: 'UTC +05:00',
  },
  {
    code: 'TZ', id: '219', name: 'Tanzania', timeZone: 'Africa/Dar_es_Salaam', offset: 'UTC +03:00',
  },
  {
    code: 'TH', id: '220', name: 'Thailand', timeZone: 'Asia/Bangkok', offset: 'UTC +07:00',
  },
  {
    code: 'TG', id: '221', name: 'Togo', timeZone: 'Africa/Lome', offset: 'UTC',
  },
  {
    code: 'TK', id: '223', name: 'Tokelau', timeZone: 'Pacific/Fakaofo', offset: 'UTC +13:00',
  },
  {
    code: 'TO', id: '224', name: 'Tonga', timeZone: 'Pacific/Tongatapu', offset: 'UTC +13:00',
  },
  {
    code: 'TT', id: '225', name: 'Trinidad and Tobago', timeZone: 'America/Port_of_Spain', offset: 'UTC -04:00',
  },
  {
    code: 'TN', id: '226', name: 'Tunisia', timeZone: 'Africa/Tunis', offset: 'UTC +01:00',
  },
  {
    code: 'TR', id: '227', name: 'Turkey', timeZone: 'Europe/Istanbul', offset: 'UTC +03:00',
  },
  {
    code: 'TM', id: '228', name: 'Turkmenistan', timeZone: 'Asia/Ashgabat', offset: 'UTC +05:00',
  },
  {
    code: 'TC', id: '229', name: 'Turks and Caicos Islands', timeZone: 'America/Grand_Turk', offset: 'UTC -05:00',
  },
  {
    code: 'TV', id: '230', name: 'Tuvalu', timeZone: 'Pacific/Funafuti', offset: 'UTC +12:00',
  },
  {
    code: 'VI', id: '231', name: 'U.S. Virgin Islands', timeZone: 'America/St_Thomas', offset: 'UTC -04:00',
  },
  {
    code: 'UG', id: '232', name: 'Uganda', timeZone: 'EAST_AFRICA_TIME', offset: 'UTC +03:00',
  },
  {
    code: 'UA', id: '233', name: 'Ukraine', timeZone: 'Europe/Kiev', offset: 'UTC +02:00',
  },
  {
    code: 'AE', id: '234', name: 'United Arab Emirates', timeZone: 'Asia/Dubai', offset: 'UTC +04:00',
  },
  {
    code: 'GB', id: '235', name: 'United Kingdom', timeZone: 'Europe/London', offset: 'UTC',
  },
  {
    code: 'US', id: '236', name: 'United States', timeZone: 'America/Adak', offset: 'UTC -10:00',
  },
  {
    code: 'UM', id: '237', name: 'United States Minor Outlying Islands', timeZone: 'Pacific/Midway', offset: 'UTC -11:00',
  },
  {
    code: 'UY', id: '238', name: 'Uruguay', timeZone: 'America/Montevideo', offset: 'UTC -03:00',
  },
  {
    code: 'UZ', id: '239', name: 'Uzbekistan', timeZone: 'Asia/Samarkand', offset: 'UTC +05:00',
  },
  {
    code: 'VU', id: '240', name: 'Vanuatu', timeZone: 'Pacific/Efate', offset: 'UTC +11:00',
  },
  {
    code: 'VA', id: '241', name: 'Vatican', timeZone: 'Europe/Vatican', offset: 'UTC +01:00',
  },
  {
    code: 'VE', id: '242', name: 'Venezuela', timeZone: 'America/Caracas', offset: 'UTC -04:00',
  },
  {
    code: 'VN', id: '243', name: 'Vietnam', timeZone: 'Asia/Ho_Chi_Minh', offset: 'UTC +07:00',
  },
  {
    code: 'WF', id: '244', name: 'Wallis and Futuna', timeZone: 'Pacific/Wallis', offset: 'UTC +12:00',
  },
  {
    code: 'EH', id: '245', name: 'Western Sahara', timeZone: 'Africa/El_Aaiun', offset: 'UTC +01:00',
  },
  {
    code: 'YE', id: '246', name: 'Yemen', timeZone: 'Asia/Aden', offset: 'UTC +03:00',
  },
  {
    code: 'ZM', id: '247', name: 'Zambia', timeZone: 'Africa/Lusaka', offset: 'UTC +02:00',
  },
  {
    code: 'ZW', id: '248', name: 'Zimbabwe', timeZone: 'Africa/Harare', offset: 'UTC +02:00',
  },
];
export default countries;
