import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  GripVertical,
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  Plus,
  Trash,
  Video,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizContent {
  question: string;
  options: QuizOption[];
  explanation: string;
  points: number;
  showExplanation: boolean;
  allowRetry: boolean;
  timeLimit?: number;
  passingScore?: number;
  feedback?: {
    correct?: string;
    incorrect?: string;
  };
  hints?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

interface ContentBlockProps {
  block: {
    id: string;
    type: string;
    content: any;
  };
  onUpdate: (content: any) => void;
  onRemove: () => void;
}

export default function ContentBlock({ block, onUpdate, onRemove }: ContentBlockProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isEditing, setIsEditing] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const addQuizOption = () => {
    const newOption: QuizOption = {
      id: Math.random().toString(36).substr(2, 9),
      text: "",
      isCorrect: false,
      explanation: "",
    };
    
    const currentOptions = block.content.options || [];
    onUpdate({
      ...block.content,
      options: [...currentOptions, newOption],
    });
  };

  const updateQuizOption = (optionId: string, updates: Partial<QuizOption>) => {
    const updatedOptions = (block.content.options || []).map((option: QuizOption) =>
      option.id === optionId ? { ...option, ...updates } : option
    );
    onUpdate({ ...block.content, options: updatedOptions });
  };

  const removeQuizOption = (optionId: string) => {
    const updatedOptions = (block.content.options || []).filter(
      (option: QuizOption) => option.id !== optionId
    );
    onUpdate({ ...block.content, options: updatedOptions });
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) return;
    
    setIsAnswerSubmitted(true);
    const isCorrect = block.content.options.find(
      (option: QuizOption) => option.id === selectedAnswer
    )?.isCorrect;

    // In a real implementation, this would trigger a callback to track progress
    console.log('Quiz answered:', { isCorrect, points: isCorrect ? block.content.points : 0 });
  };

  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setTimeRemaining(block.content.timeLimit);
  };

  const renderQuizBlock = () => {
    if (previewMode) {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{block.content.question}</h3>
            {block.content.timeLimit && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>{timeRemaining || block.content.timeLimit}s</span>
              </div>
            )}
          </div>

          {block.content.points > 0 && (
            <div className="text-sm text-muted-foreground">
              Points: {block.content.points}
            </div>
          )}

          {block.content.difficulty && (
            <Badge variant={
              block.content.difficulty === 'easy' ? 'success' :
              block.content.difficulty === 'medium' ? 'warning' : 'danger'
            }>
              {block.content.difficulty.charAt(0).toUpperCase() + block.content.difficulty.slice(1)}
            </Badge>
          )}

          <RadioGroup
            value={selectedAnswer || ""}
            onValueChange={setSelectedAnswer}
            className="space-y-2"
            disabled={isAnswerSubmitted}
          >
            {(block.content.options || []).map((option: QuizOption) => {
              let optionClass = "border";
              if (isAnswerSubmitted) {
                if (option.isCorrect) {
                  optionClass = "border-green-500 bg-green-50 dark:bg-green-950";
                } else if (selectedAnswer === option.id && !option.isCorrect) {
                  optionClass = "border-red-500 bg-red-50 dark:bg-red-950";
                }
              }

              return (
                <div key={option.id} className={`flex items-center space-x-2 rounded-lg ${optionClass} p-4`}>
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                    {option.text}
                  </Label>
                  {isAnswerSubmitted && (
                    <div className="ml-2">
                      {option.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : selectedAnswer === option.id ? (
                        <XCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>

          {!isAnswerSubmitted ? (
            <Button
              onClick={handleAnswerSubmit}
              disabled={!selectedAnswer}
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {block.content.showExplanation && (
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <h4 className="font-medium">Explanation</h4>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {block.content.explanation}
                  </p>
                </div>
              )}

              {block.content.allowRetry && (
                <Button onClick={resetQuiz} variant="outline" className="w-full">
                  Try Again
                </Button>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Question</Label>
          <Textarea
            value={block.content.question || ""}
            onChange={(e) => onUpdate({ ...block.content, question: e.target.value })}
            placeholder="Enter your question..."
            rows={2}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Options</Label>
            <Button variant="outline" size="sm" onClick={addQuizOption}>
              <Plus className="mr-2 h-4 w-4" />
              Add Option
            </Button>
          </div>
          
          <div className="space-y-3">
            {(block.content.options || []).map((option: QuizOption) => (
              <div key={option.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <Input
                      value={option.text}
                      onChange={(e) => updateQuizOption(option.id, { text: e.target.value })}
                      placeholder="Enter option text"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={option.isCorrect}
                        onCheckedChange={(checked) => 
                          updateQuizOption(option.id, { isCorrect: checked })
                        }
                      />
                      <span className="text-sm">Correct</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeQuizOption(option.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={option.explanation || ""}
                  onChange={(e) => updateQuizOption(option.id, { explanation: e.target.value })}
                  placeholder="Option-specific explanation (optional)"
                  rows={2}
                  className="text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>General Explanation</Label>
          <Textarea
            value={block.content.explanation || ""}
            onChange={(e) => onUpdate({ ...block.content, explanation: e.target.value })}
            placeholder="Explain the correct answer..."
            rows={3}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Points</Label>
            <Input
              type="number"
              min="0"
              value={block.content.points || 0}
              onChange={(e) => onUpdate({ 
                ...block.content, 
                points: parseInt(e.target.value) || 0 
              })}
            />
          </div>
          <div className="space-y-2">
            <Label>Time Limit (seconds)</Label>
            <Input
              type="number"
              min="0"
              value={block.content.timeLimit || ""}
              onChange={(e) => onUpdate({ 
                ...block.content, 
                timeLimit: parseInt(e.target.value) || undefined 
              })}
              placeholder="No limit"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Difficulty Level</Label>
          <RadioGroup
            value={block.content.difficulty || 'medium'}
            onValueChange={(value) => onUpdate({
              ...block.content,
              difficulty: value
            })}
          >
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <Input
            value={block.content.tags?.join(", ") || ""}
            onChange={(e) => onUpdate({
              ...block.content,
              tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
            })}
            placeholder="Enter tags separated by commas"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Explanation</Label>
              <p className="text-sm text-muted-foreground">
                Display explanation after answering
              </p>
            </div>
            <Switch
              checked={block.content.showExplanation || false}
              onCheckedChange={(checked) => 
                onUpdate({ ...block.content, showExplanation: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Allow Retry</Label>
              <p className="text-sm text-muted-foreground">
                Let students retry incorrect answers
              </p>
            </div>
            <Switch
              checked={block.content.allowRetry || false}
              onCheckedChange={(checked) => 
                onUpdate({ ...block.content, allowRetry: checked })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Passing Score (%)</Label>
          <Input
            type="number"
            min="0"
            max="100"
            value={block.content.passingScore || ""}
            onChange={(e) => onUpdate({
              ...block.content,
              passingScore: parseInt(e.target.value) || undefined
            })}
            placeholder="Default: 80%"
          />
        </div>

        <div className="space-y-2">
          <Label>Feedback Messages</Label>
          <div className="grid gap-4">
            <div>
              <Label className="text-sm">Correct Answer</Label>
              <Input
                value={block.content.feedback?.correct || ""}
                onChange={(e) => onUpdate({
                  ...block.content,
                  feedback: {
                    ...block.content.feedback,
                    correct: e.target.value
                  }
                })}
                placeholder="Great job! You got it right!"
              />
            </div>
            <div>
              <Label className="text-sm">Incorrect Answer</Label>
              <Input
                value={block.content.feedback?.incorrect || ""}
                onChange={(e) => onUpdate({
                  ...block.content,
                  feedback: {
                    ...block.content.feedback,
                    incorrect: e.target.value
                  }
                })}
                placeholder="Not quite right. Try again!"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hints</Label>
          <div className="space-y-2">
            {(block.content.hints || []).map((hint: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={hint}
                  onChange={(e) => {
                    const newHints = [...(block.content.hints || [])];
                    newHints[index] = e.target.value;
                    onUpdate({
                      ...block.content,
                      hints: newHints
                    });
                  }}
                  placeholder={`Hint ${index + 1}`}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const newHints = [...(block.content.hints || [])];
                    newHints.splice(index, 1);
                    onUpdate({
                      ...block.content,
                      hints: newHints
                    });
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate({
                ...block.content,
                hints: [...(block.content.hints || []), ""]
              })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Hint
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderBlockContent = () => {
    switch (block.type) {
      case "quiz":
        return renderQuizBlock();
      case "text":
        return (
          <div className="space-y-2">
            <Label>Text Content</Label>
            <Textarea
              value={block.content.text || ""}
              onChange={(e) => onUpdate({ ...block.content, text: e.target.value })}
              placeholder="Enter your content..."
              rows={4}
            />
          </div>
        );

      case "video":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Video URL</Label>
              <div className="flex gap-2">
                <Input
                  value={block.content.url || ""}
                  onChange={(e) => onUpdate({ ...block.content, url: e.target.value })}
                  placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                />
                <Button variant="outline">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {block.content.url && (
              <div className="aspect-video rounded-lg border bg-muted">
                <iframe
                  src={block.content.url}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        );

      case "image":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Image URL</Label>
              <div className="flex gap-2">
                <Input
                  value={block.content.url || ""}
                  onChange={(e) => onUpdate({ ...block.content, url: e.target.value })}
                  placeholder="Enter image URL"
                />
                <Button variant="outline">
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Caption</Label>
              <Input
                value={block.content.caption || ""}
                onChange={(e) => onUpdate({ ...block.content, caption: e.target.value })}
                placeholder="Image caption (optional)"
              />
            </div>
            {block.content.url && (
              <img
                src={block.content.url}
                alt={block.content.caption || ""}
                className="max-w-full rounded-lg"
              />
            )}
          </div>
        );

      case "code":
        return (
          <div className="space-y-2">
            <Label>Code</Label>
            <Textarea
              value={block.content.code || ""}
              onChange={(e) => onUpdate({ ...block.content, code: e.target.value })}
              placeholder="Enter code..."
              rows={8}
              className="font-mono"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getBlockIcon = () => {
    switch (block.type) {
      case "text":
        return MessageSquare;
      case "video":
        return Video;
      case "image":
        return ImageIcon;
      case "code":
        return Code2;
      default:
        return MessageSquare;
    }
  };

  const BlockIcon = getBlockIcon();

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4">
          <div className="flex items-center gap-2">
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab rounded-md p-2 hover:bg-muted"
            >
              <GripVertical className="h-4 w-4" />
            </button>
            <BlockIcon className="h-4 w-4" />
            <span className="font-medium capitalize">{block.type}</span>
          </div>
          <div className="flex items-center gap-2">
            {block.type === "quiz" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
              >
                {previewMode ? "Edit" : "Preview"}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderBlockContent()}</CardContent>
      </Card>
    </div>
  );
}