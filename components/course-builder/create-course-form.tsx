"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  BookOpen,
  Code2,
  FileText,
  Image as ImageIcon,
  LayoutDashboard,
  Link as LinkIcon,
  Loader2,
  MessageSquare,
  Plus,
  Save,
  Video,
} from "lucide-react";
import ContentBlock from "@/components/course-builder/content-block";
import { useToast } from "@/hooks/use-toast";
import { updateCourse, updateCourseContent, updateCourseMedia } from "@/lib/data";

interface Block {
  id: string;
  type: "text" | "video" | "image" | "code" | "quiz" | "assignment";
  content: any;
}

export interface CreateCoursePageProps {
  initialData?: any;
  mode?: "create" | "edit";
}

export function CreateCourseForm({ initialData, mode = "create" }: CreateCoursePageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [courseData, setCourseData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    level: initialData?.level || "beginner",
    price: initialData?.price?.toString() || "0",
    isFree: initialData?.is_free || false,
    thumbnail: initialData?.thumbnail_url || "",
    previewVideo: initialData?.preview_video || "",
  });
  const [blocks, setBlocks] = useState<Block[]>(
    initialData?.content?.modules?.[0]?.lessons?.map((lesson: any) => ({
      id: uuidv4(),
      type: lesson.type || "text",
      content: {
        text: lesson.content,
        url: lesson.videoUrl,
        ...lesson,
      },
    })) || []
  );

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG or PNG image.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setCourseData({
        ...courseData,
        thumbnail: e.target?.result as string
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  const addBlock = (type: Block["type"]) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: {},
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (mode === "edit" && initialData?.id) {
        await updateCourse(initialData.id, {
          ...courseData,
          content: {
            modules: [{
              title: "Main Content",
              lessons: blocks.map(block => ({
                type: block.type,
                content: block.content,
              })),
            }],
          },
        });

        toast({
          title: "Course updated successfully",
          description: "Your changes have been saved.",
        });
      } else {
        // Simulate API call for creation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
          title: "Course created successfully",
          description: "Your course has been created and is ready for review.",
        });
      }
      
      router.push("/dashboard/courses");
    } catch (error) {
      toast({
        title: "Error saving course",
        description: "There was a problem saving your course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground mt-1">
            Build your course content using the drag-and-drop builder
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Course
            </>
          )}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={courseData.title}
                  onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                  placeholder="Enter course title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={courseData.description}
                  onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                  placeholder="Describe your course"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Course Level</Label>
                <RadioGroup
                  value={courseData.level}
                  onValueChange={(value) => setCourseData({ ...courseData, level: value })}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate</Label>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Free Course</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this course available for free
                  </p>
                </div>
                <Switch
                  checked={courseData.isFree}
                  onCheckedChange={(checked) => {
                    setCourseData({ 
                      ...courseData, 
                      isFree: checked,
                      price: checked ? "0" : courseData.price 
                    });
                  }}
                />
              </div>

              {!courseData.isFree && (
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">$</span>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={courseData.price}
                      onChange={(e) => setCourseData({ ...courseData, price: e.target.value })}
                      className="pl-7"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="content">
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBlock("text")}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Add Text
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBlock("video")}
                      >
                        <Video className="mr-2 h-4 w-4" />
                        Add Video
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBlock("image")}
                      >
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Add Image
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBlock("code")}
                      >
                        <Code2 className="mr-2 h-4 w-4" />
                        Add Code
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addBlock("quiz")}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Add Quiz
                      </Button>
                    </div>

                    <DndContext
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={blocks}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-4">
                          {blocks.map((block) => (
                            <ContentBlock
                              key={block.id}
                              block={block}
                              onUpdate={(content) => updateBlock(block.id, content)}
                              onRemove={() => removeBlock(block.id)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>

                    {blocks.length === 0 && (
                      <div className="text-center py-8">
                        <LayoutDashboard className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">No content blocks yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Add your first content block using the buttons above
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="preview">
                  <div className="rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <AlertCircle className="h-4 w-4" />
                      <p className="text-sm">
                        This is how your course content will appear to students
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-6">
                    {blocks.map((block) => (
                      <div key={block.id} className="rounded-lg border p-4">
                        {block.type === "text" && (
                          <div dangerouslySetInnerHTML={{ __html: block.content.text || "" }} />
                        )}
                        {block.type === "video" && block.content.url && (
                          <div className="aspect-video">
                            <iframe
                              src={block.content.url}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        )}
                        {block.type === "image" && block.content.url && (
                          <img
                            src={block.content.url}
                            alt={block.content.caption || ""}
                            className="max-w-full rounded-lg"
                          />
                        )}
                        {block.type === "code" && (
                          <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                            <code>{block.content.code || ""}</code>
                          </pre>
                        )}
                      </div>
                    ))}

                    {blocks.length === 0 && (
                      <div className="text-center py-8">
                        <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-semibold">No content to preview</h3>
                        <p className="text-sm text-muted-foreground">
                          Add some content blocks to see how they'll look
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thumbnail Image</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileUpload}
                />
                <div className="aspect-video rounded-lg border-2 border-dashed flex items-center justify-center bg-muted">
                  {courseData.thumbnail ? (
                    <div className="relative w-full h-full">
                      <img
                        src={courseData.thumbnail}
                        alt="Course thumbnail"
                        className="object-cover w-full h-full rounded-lg"
                      />
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          Change Image
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCourseData({ ...courseData, thumbnail: "" })}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Upload Thumbnail
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload a JPG or PNG image (max 5MB)
                </p>
              </div>

              <div className="space-y-2">
                <Label>Preview Video</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter video URL"
                      value={courseData.previewVideo}
                      onChange={(e) => setCourseData({ ...courseData, previewVideo: e.target.value })}
                    />
                    <Button variant="outline">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {courseData.previewVideo && (
                    <div className="aspect-video rounded-lg border bg-muted">
                      <iframe
                        src={courseData.previewVideo}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Draft Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Save as draft to publish later
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Student Preview</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow students to preview content
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}