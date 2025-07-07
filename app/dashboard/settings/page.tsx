"use client"

import { useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getUserData, useUserData, type StudentUser, type CreatorUser } from "@/lib/data";

// Form validation schemas
const studentProfileSchema = z.object({
  firstName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  location: z.string().optional(),
  interests: z.string().optional(),
  education: z.object({
    level: z.string(),
    field: z.string(),
    school: z.string()
  }).optional(),
});

const creatorProfileSchema = z.object({
  firstName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  bio: z.string().max(500, { message: "Bio must not exceed 500 characters." }).optional(),
  company: z.string().optional(),
  website: z.string().url({ message: "Invalid URL." }).optional().or(z.literal("")),
  expertise: z.string().optional(),
});

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const roleParam = searchParams.get('role');
  let role: 'student' | 'creator';
  
  if (roleParam === 'student') {
    role = 'student';
  } else if (roleParam === 'creator') {
    role = 'creator';
  } else {
    role = pathname.includes('/dashboard/creator') ? 'creator' : 'student';
  }
  
  // Use the hook version instead of the async function
  const { data: user, isLoading } = useUserData(role);
  
  // Type narrowing for better TypeScript inference - only after we have the data
  const creatorUser = (role === 'creator' && user) ? user as CreatorUser : null;
  const studentUser = (role === 'student' && user) ? user as StudentUser : null;
  
  const form = useForm({
    resolver: zodResolver(role === 'creator' ? creatorProfileSchema : studentProfileSchema),
    defaultValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      email: user?.email || '',
      ...(role === 'creator' && creatorUser ? {
        title: creatorUser?.profile?.title || '',
        bio: creatorUser?.profile?.bio || '',
        company: creatorUser?.profile?.company || '',
        website: creatorUser?.profile?.website || '',
        expertise: creatorUser?.profile?.expertise?.join(", ") || ''
      } : {
        bio: studentUser?.profile?.bio || '',
        location: studentUser?.profile?.location || '',
        interests: studentUser?.profile?.interests?.join(", ") || '',
        education: studentUser?.profile?.education || {
          level: '',
          field: '',
          school: ''
        }
      })
    },
  });
  
  function onSubmit(values: z.infer<typeof studentProfileSchema> | z.infer<typeof creatorProfileSchema>) {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSaving(false);
    }, 1500);
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Loading Settings...</h2>
        </div>
      </div>
    );
  }

  const renderStudentSettings = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Student Profile</CardTitle>
          <CardDescription>
            Update your personal information and learning preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about yourself and your learning goals"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="education.level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education Level</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Bachelor's Degree" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="education.field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="e.g., Computer Science" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Preferences</CardTitle>
          <CardDescription>
            Customize your learning experience and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Course Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about course updates
                </p>
              </div>
              <Switch defaultChecked={studentUser?.preferences?.email_notifications?.course_updates} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Learning Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get reminders about your study schedule
                </p>
              </div>
              <Switch defaultChecked={studentUser?.preferences?.email_notifications?.learning_reminders} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Achievement Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Notifications for earned achievements
                </p>
              </div>
              <Switch defaultChecked={studentUser?.preferences?.email_notifications?.achievement_alerts} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Weekly Study Goal</Label>
            <Input
              type="number"
              defaultValue={studentUser?.preferences?.learning_preferences?.weekly_study_goal}
              min="1"
              max="168"
            />
            <p className="text-sm text-muted-foreground">
              Set your weekly learning target in hours
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility Settings</CardTitle>
          <CardDescription>
            Customize your learning experience for better accessibility.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Captions</Label>
              <p className="text-sm text-muted-foreground">
                Enable captions for video content
              </p>
            </div>
            <Switch defaultChecked={studentUser?.preferences?.accessibility?.captions_enabled} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch defaultChecked={studentUser?.preferences?.accessibility?.high_contrast} />
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <select
              className="w-full rounded-md border p-2"
              defaultValue={studentUser?.preferences?.accessibility?.font_size}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderCreatorSettings = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Creator Profile</CardTitle>
          <CardDescription>
            Update your professional information and teaching profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Professional Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        placeholder="Tell students about your expertise and teaching experience"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company/Organization</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input {...field} type="url" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="expertise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g., JavaScript, React, Node.js" />
                    </FormControl>
                    <FormDescription>
                      Separate multiple areas with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Defaults</CardTitle>
          <CardDescription>
            Set default settings for your new courses.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Default Language</Label>
            <select
              className="w-full rounded-md border p-2"
              defaultValue={creatorUser?.preferences?.course_defaults?.language}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Default Difficulty</Label>
            <select
              className="w-full rounded-md border p-2"
              defaultValue={creatorUser?.preferences?.course_defaults?.difficulty}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-generate Captions</Label>
              <p className="text-sm text-muted-foreground">
                Automatically generate captions for video content
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout Settings</CardTitle>
          <CardDescription>
            Manage your earnings and payout preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Current Balance</h3>
                <p className="text-2xl font-bold">${creatorUser?.earnings?.pending || 0}</p>
              </div>
              <Button>Withdraw</Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Next automatic payout on {creatorUser?.earnings?.last_payout?.date ? new Date(creatorUser.earnings.last_payout.date).toLocaleDateString() : 'N/A'}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Payout Method</Label>
                <p className="text-sm text-muted-foreground">
                  {creatorUser?.preferences?.payout_method?.type === 'bank_transfer' ? 'Bank Transfer' : 'PayPal'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Payout Frequency</Label>
                <p className="text-sm text-muted-foreground">
                  {creatorUser?.preferences?.payout_method?.frequency === 'monthly' ? 'Monthly' : 'Weekly'}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Minimum Payout</Label>
                <p className="text-sm text-muted-foreground">
                  ${creatorUser?.preferences?.payout_method?.threshold || 0}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">
            {role === 'creator' ? "Course Defaults" : "Learning Preferences"}
          </TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {role === 'creator' && <TabsTrigger value="payouts">Payouts</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          {role === 'creator' ? renderCreatorSettings() : renderStudentSettings()}
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          {role === 'creator' ? (
            (() => {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>Course Default Settings</CardTitle>
                    <CardDescription>
                      Configure default settings for new courses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Default Language</Label>
                      <select
                        className="w-full rounded-md border p-2"
                        defaultValue={creatorUser?.preferences?.course_defaults?.language}
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label>Default Difficulty</Label>
                      <select
                        className="w-full rounded-md border p-2"
                        defaultValue={creatorUser?.preferences?.course_defaults?.difficulty}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              );
            })()
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  Customize your learning experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Content Type</Label>
                  <select
                    className="w-full rounded-md border p-2"
                    defaultValue={studentUser?.preferences?.learning_preferences?.preferred_content_type}
                  >
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="interactive">Interactive</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Weekly Study Goal (hours)</Label>
                  <Input
                    type="number"
                    defaultValue={studentUser?.preferences?.learning_preferences?.weekly_study_goal}
                    min="1"
                    max="168"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {role === 'creator' ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new course reviews
                      </p>
                    </div>
                    <Switch defaultChecked={creatorUser?.preferences?.notification_settings?.new_reviews} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Course Performance</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive course performance updates
                      </p>
                    </div>
                    <Switch defaultChecked={creatorUser?.preferences?.notification_settings?.course_performance} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Student Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about student messages
                      </p>
                    </div>
                    <Switch defaultChecked={creatorUser?.preferences?.notification_settings?.student_messages} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Course Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about course updates
                      </p>
                    </div>
                    <Switch defaultChecked={studentUser?.preferences?.email_notifications?.course_updates} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Learning Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive study reminders
                      </p>
                    </div>
                    <Switch defaultChecked={studentUser?.preferences?.email_notifications?.learning_reminders} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Achievement Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about new achievements
                      </p>
                    </div>
                    <Switch defaultChecked={studentUser?.preferences?.email_notifications?.achievement_alerts} />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {role === 'creator' && (
          <TabsContent value="payouts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Payout Information</CardTitle>
                <CardDescription>
                  Manage your payment details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Current Balance</h3>
                      <p className="text-2xl font-bold">${creatorUser?.earnings?.pending || 0}</p>
                    </div>
                    <Button>Withdraw</Button>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Next automatic payout on {creatorUser?.earnings?.last_payout?.date ? new Date(creatorUser.earnings.last_payout.date).toLocaleDateString() : 'N/A'}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payout Method</Label>
                      <p className="text-sm text-muted-foreground">
                        {creatorUser?.preferences?.payout_method?.type === 'bank_transfer' ? 'Bank Transfer' : 'PayPal'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Payout Frequency</Label>
                      <p className="text-sm text-muted-foreground">
                        {creatorUser?.preferences?.payout_method?.frequency === 'monthly' ? 'Monthly' : 'Weekly'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Minimum Payout</Label>
                      <p className="text-sm text-muted-foreground">
                        ${creatorUser?.preferences?.payout_method?.threshold || 0}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}