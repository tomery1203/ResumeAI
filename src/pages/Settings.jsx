import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Save, Bell, Shield, UserCircle, Palette } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // Add other settings fields here
    emailNotifications: true,
    darkMode: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
        setFormData({
          fullName: currentUser.full_name || '',
          email: currentUser.email || '',
          emailNotifications: currentUser.preferences?.emailNotifications ?? true,
          darkMode: currentUser.preferences?.darkMode ?? false,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = (id, checked) => {
    setFormData((prev) => ({ ...prev, [id]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Assuming User.updateMyUserData can handle nested preferences
      await User.updateMyUserData({
        full_name: formData.fullName,
        // Email usually cannot be changed by the user directly, confirm this behavior
        // email: formData.email, 
        preferences: {
          emailNotifications: formData.emailNotifications,
          darkMode: formData.darkMode,
        },
      });
      // Optionally refetch user or update local state if needed
      const updatedUser = await User.me();
      setUser(updatedUser);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error("Error saving settings:", error);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />
        <Card><CardHeader><Skeleton className="h-6 w-32 mb-2" /><Skeleton className="h-4 w-48" /></CardHeader><CardContent className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></CardContent><CardFooter><Skeleton className="h-10 w-24" /></CardFooter></Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile, preferences, and notification settings.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center"><UserCircle className="mr-2 h-5 w-5 text-indigo-600" />Profile Information</CardTitle>
            <CardDescription>Update your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.profile_picture_url || `https://ui-avatars.com/api/?name=${formData.fullName.replace(' ', '+')}&background=random`} alt={formData.fullName} />
                <AvatarFallback>{formData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <Button type="button" variant="outline">Change Photo</Button>
                <p className="text-xs text-gray-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={formData.email} disabled />
              <p className="text-xs text-gray-500">Email cannot be changed.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-indigo-600" />Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications from us.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive updates about new features and tips.</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => handleSwitchChange('emailNotifications', checked)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-indigo-600" />Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <Label htmlFor="darkMode" className="font-medium">Dark Mode</Label>
                <p className="text-sm text-gray-500">Toggle dark mode for the application interface.</p>
              </div>
              <Switch
                id="darkMode"
                checked={formData.darkMode}
                onCheckedChange={(checked) => handleSwitchChange('darkMode', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-indigo-600" />Security</CardTitle>
            <CardDescription>Manage your account security settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="outline">Change Password</Button>
            <p className="text-xs text-gray-500 mt-1">It's a good idea to use a strong password that you're not using elsewhere.</p>
          </CardContent>
        </Card>
        
        <div className="mt-8 flex justify-end">
          <Button type="submit" disabled={saving} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}