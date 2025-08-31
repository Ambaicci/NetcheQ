import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {   
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Settings</h1>

      <div className="grid gap-6 max-w-2xl">
        {/* Profile Settings */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Profile</CardTitle> 
            <CardDescription className="text-blue-700">Update your account information</CardDescription>        
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">    
              <Label htmlFor="name" className="text-blue-800">Full Name</Label>
              <Input id="name" placeholder="Your full name" className="border-blue-300 focus:border-blue-500" />
            </div>
            <div className="space-y-2">    
              <Label htmlFor="email" className="text-blue-800">Email</Label>
              <Input id="email" type="email" placeholder="your.email@example.com" className="border-blue-300 focus:border-blue-500" />  
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}      
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Notifications</CardTitle>
            <CardDescription className="text-blue-700">Manage how you receive notifications</CardDescription>   
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications" className="text-blue-800">Email Notifications</Label>      
                <p className="text-sm text-blue-600">Receive email alerts</p>        
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="text-blue-800">Push Notifications</Label>        
                <p className="text-sm text-blue-600">Browser notifications</p>       
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="text-blue-900">Security</CardTitle>
            <CardDescription className="text-blue-700">Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">    
              <Label htmlFor="current-password" className="text-blue-800">Current Password</Label>
              <Input id="current-password" type="password" className="border-blue-300 focus:border-blue-500" />
            </div>
            <div className="space-y-2">    
              <Label htmlFor="new-password" className="text-blue-800">New Password</Label>
              <Input id="new-password" type="password" className="border-blue-300 focus:border-blue-500" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Change Password</Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">  
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
            <CardDescription className="text-red-600">Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
