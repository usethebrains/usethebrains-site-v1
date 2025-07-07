import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, XCircle, HelpCircle } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

interface QuizBlockProps {
  content: {
    question: string;
    options: QuizOption[];
    explanation?: string;
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
  };
  onComplete?: (result: { correct: boolean; points: number }) => void;
}

export function QuizBlock({ content, onComplete }: QuizBlockProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(content.timeLimit || 0);
  const [retryCount, setRetryCount] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (content.timeLimit && timeLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [content.timeLimit, timeLeft, isSubmitted]);

  const isCorrect = selectedOption && 
    content.options.find(opt => opt.id === selectedOption)?.isCorrect;

  const handleSubmit = () => {
    if (!selectedOption && timeLeft > 0) return;
    
    setIsSubmitted(true);
    
    if (onComplete) {
      onComplete({
        correct: isCorrect || false,
        points: isCorrect ? content.points : 0
      });
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setRetryCount(retryCount + 1);
    setTimeLeft(content.timeLimit || 0);
    setShowHints(false);
    setCurrentHintIndex(0);
  };

  const showNextHint = () => {
    if (currentHintIndex < (content.hints?.length || 0) - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {content.question}
          </CardTitle>
          {content.timeLimit && content.timeLimit > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={timeLeft <= 10 ? "text-red-500" : ""}>
                {timeLeft}s
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-2">
          {content.points > 0 && (
            <Badge variant="outline">
              {content.points} points
            </Badge>
          )}
          {content.difficulty && (
            <Badge variant={
              content.difficulty === 'easy' ? 'success' :
              content.difficulty === 'medium' ? 'warning' : 'danger'
            }>
              {content.difficulty.charAt(0).toUpperCase() + content.difficulty.slice(1)}
            </Badge>
          )}
          {content.tags?.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={selectedOption || ""}
          onValueChange={setSelectedOption}
          className="space-y-2"
          disabled={isSubmitted && !content.allowRetry}
        >
          {content.options.map((option) => {
            const isSelected = selectedOption === option.id;
            let optionClass = "border";
            
            if (isSubmitted) {
              if (option.isCorrect) {
                optionClass = "border-green-500 bg-green-50 dark:bg-green-950";
              } else if (isSelected && !option.isCorrect) {
                optionClass = "border-red-500 bg-red-50 dark:bg-red-950";
              }
            }

            return (
              <div
                key={option.id}
                className={`flex items-center space-x-2 rounded-lg ${optionClass} p-4 transition-colors`}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                  {option.text}
                </Label>
                {isSubmitted && (
                  <div className="ml-2">
                    {option.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : isSelected ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}
        </RadioGroup>

        {content.hints && content.hints.length > 0 && !isSubmitted && (
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="w-full"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              {showHints ? "Hide Hints" : "Show Hints"}
            </Button>
            {showHints && (
              <div className="space-y-2">
                {content.hints.slice(0, currentHintIndex + 1).map((hint, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    <span className="font-medium">Hint {index + 1}:</span> {hint}
                  </div>
                ))}
                {currentHintIndex < content.hints.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={showNextHint}
                    className="w-full"
                  >
                    Show Next Hint
                  </Button>
                )}
              </div>
            )}
          </div>
        )}

        {isSubmitted && (
          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <p className="font-medium">
                  {isCorrect
                    ? content.feedback?.correct || "Correct!"
                    : content.feedback?.incorrect || "Incorrect"}
                </p>
              </div>
              {selectedOption && !isCorrect && content.options.find(opt => opt.id === selectedOption)?.explanation && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {content.options.find(opt => opt.id === selectedOption)?.explanation}
                </p>
              )}
            </div>

            {content.showExplanation && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <h4 className="font-medium">Explanation</h4>
                </div>
                {content.explanation && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {content.explanation}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isSubmitted ? (
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={!selectedOption || timeLeft === 0}
          >
            Submit Answer
          </Button>
        ) : content.allowRetry && !isCorrect ? (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleRetry}
          >
            Try Again
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}

export default QuizBlock;