import { BarChart3, TrendingUp, Clock, Target, Award, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export function Analytics() {
  const weeklyActivity = [
    { day: 'Mon', hours: 3.5 },
    { day: 'Tue', hours: 4.2 },
    { day: 'Wed', hours: 2.8 },
    { day: 'Thu', hours: 5.1 },
    { day: 'Fri', hours: 3.9 },
    { day: 'Sat', hours: 6.2 },
    { day: 'Sun', hours: 4.5 },
  ];

  const progressData = [
    { month: 'Jan', courses: 2 },
    { month: 'Feb', courses: 3 },
    { month: 'Mar', courses: 5 },
    { month: 'Apr', courses: 4 },
    { month: 'May', courses: 6 },
  ];

  const categoryData = [
    { name: 'AI & ML', value: 35, color: '#7C5CFF' },
    { name: 'Development', value: 30, color: '#06B6D4' },
    { name: 'Data Science', value: 20, color: '#8B5CF6' },
    { name: 'Design', value: 15, color: '#A78BFA' },
  ];

  const stats = [
    {
      title: 'Total Learning Time',
      value: '127 hours',
      change: '+12%',
      icon: Clock,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      title: 'Courses Completed',
      value: '8',
      change: '+2 this month',
      icon: Award,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Current Streak',
      value: '15 days',
      change: 'Keep it up!',
      icon: Zap,
      gradient: 'from-orange-500 to-red-600',
    },
    {
      title: 'Goal Progress',
      value: '73%',
      change: 'On track',
      icon: Target,
      gradient: 'from-green-500 to-emerald-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Learning Analytics</h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Track your progress and insights powered by AI
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="glass-hover rounded-2xl p-6 border border-[var(--color-border)] transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-[var(--color-text-secondary)] mb-2">{stat.title}</div>
              <div className="text-xs text-[var(--color-accent-cyan)]">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Chart */}
        <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">Weekly Activity</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  background: '#0D1322',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="hours" fill="#7C5CFF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course Progress Chart */}
        <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">Monthly Progress</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  background: '#0D1322',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
              <Line type="monotone" dataKey="courses" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="glass-hover rounded-2xl p-6 border border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-[var(--color-primary)]" />
          <h3 className="text-lg font-bold">Learning by Category</h3>
        </div>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#0D1322',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
