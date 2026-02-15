// Mapping of product icons to lucide-react icon names
export const iconMap: Record<string, string> = {
  'Cog': 'Cog',
  'Calendar': 'Calendar',
  'TrendingUp': 'TrendingUp',
  'Coins': 'Coins',
  'Lock': 'Lock',
  'BarChart3': 'BarChart3',
  'Zap': 'Zap',
  'MessageSquare': 'MessageSquare',
  'Rocket': 'Rocket',
  'Radio': 'Radio',
  'Megaphone': 'Megaphone',
  'Search': 'Search',
  'DollarSign': 'DollarSign',
  'PieChart': 'PieChart',
  'Users': 'Users',
  'Headphones': 'Headphones',
};

export type IconName = keyof typeof iconMap;
