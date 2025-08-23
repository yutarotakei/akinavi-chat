import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, MessageCircle, Type, Send, SkipForward, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // チャットボットの質問設定
  const questions = [
    {
      id: 'serviceType',
      question: 'どのようなサービスをお探しですか？',
      botMessage: 'こんにちは！あなたに最適な福祉サービスを見つけるお手伝いをします。\n\nまず、どのようなサービスをお探しですか？',
      type: 'single',
      options: [
        { value: 'seikatsu_kaigo', label: '生活介護', description: '日中活動や身体介護が必要な方向け' },
        { value: 'houkago_day', label: '放課後等デイサービス', description: '小学生〜高校生の放課後・休日支援' },
        { value: 'syuro_b', label: '就労継続支援B型', description: '働く訓練をしながら工賃を得る' },
        { value: 'syuro_a', label: '就労継続支援A型', description: '雇用契約を結んで働く' },
        { value: 'tanki_nyusyo', label: '短期入所', description: '一時的な宿泊サービス' },
        { value: 'other', label: 'その他', description: 'その他のサービス' }
      ]
    },
    {
      id: 'urgency',
      question: 'いつ頃からの利用をお考えですか？',
      botMessage: 'ありがとうございます！\n\n次に、いつ頃からの利用をお考えですか？',
      type: 'single',
      options: [
        { value: 'immediate', label: '今すぐ利用したい', description: '空きがあればすぐに' },
        { value: 'within_1month', label: '1ヶ月以内', description: '1ヶ月以内に利用開始したい' },
        { value: 'within_3months', label: '3ヶ月以内', description: '3ヶ月以内に利用開始したい' },
        { value: 'within_6months', label: '半年以内', description: '半年以内に利用開始したい' },
        { value: 'consulting', label: '相談から始めたい', description: 'まずは相談してみたい' }
      ]
    },
    {
      id: 'ageGroup',
      question: '利用される方の年齢を教えてください',
      botMessage: '承知しました！\n\n利用される方の年齢を教えてください。',
      type: 'single',
      options: [
        { value: 'child', label: '未就学児（0〜5歳）', description: '保育園・幼稚園年代' },
        { value: 'elementary', label: '小学生（6〜11歳）', description: '小学校1〜6年生' },
        { value: 'junior_high', label: '中学生（12〜14歳）', description: '中学校1〜3年生' },
        { value: 'high_school', label: '高校生（15〜17歳）', description: '高等学校1〜3年生' },
        { value: 'young_adult', label: '18〜39歳', description: '若年成人' },
        { value: 'middle_age', label: '40〜64歳', description: '中年成人' },
        { value: 'senior', label: '65歳以上', description: '高齢者' }
      ]
    },
    {
      id: 'disabilityType',
      question: 'どのような障害をお持ちですか？（複数選択可）',
      botMessage: 'ありがとうございます！\n\nどのような障害をお持ちですか？複数選択していただけます。',
      type: 'multiple',
      options: [
        { value: 'physical', label: '身体障害', description: '肢体不自由、視覚・聴覚障害など' },
        { value: 'intellectual', label: '知的障害', description: '知的な発達に遅れがある' },
        { value: 'mental', label: '精神障害', description: 'うつ病、統合失調症など' },
        { value: 'developmental', label: '発達障害', description: 'ADHD、自閉症スペクトラムなど' },
        { value: 'higher_brain', label: '高次脳機能障害', description: '脳外傷による記憶・注意障害など' },
        { value: 'other', label: 'その他・複数', description: 'その他の障害や複数の障害' },
        { value: 'unknown', label: 'わからない', description: '診断がまだの場合など' }
      ]
    },
    {
      id: 'careLevel',
      question: '必要な支援の程度はどれくらいですか？',
      botMessage: 'もう少しで完了です！\n\n必要な支援の程度はどれくらいですか？',
      type: 'single',
      options: [
        { value: 'independent', label: '自立〜軽度の支援', description: '見守りや声かけ程度' },
        { value: 'moderate', label: '中程度の支援', description: '一部介助が必要' },
        { value: 'intensive', label: '重度の支援', description: '全面的な介助が必要' },
        { value: 'medical', label: '医療的ケア', description: '医療的なケアが必要' },
        { value: 'consulting', label: 'わからない', description: 'どの程度か相談したい' }
      ]
    }
  ];

  useEffect(() => {
    if (!showWelcome && chatHistory.length === 0) {
      // 最初の質問をボットメッセージとして追加
      setTimeout(() => {
        addBotMessage(questions[0].botMessage, questions[0]);
      }, 500);
    }
  }, [showWelcome]);

  useEffect(() => {
    // チャット画面を最下部にスクロール
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const addBotMessage = (message, question = null) => {
    setIsTyping(true);
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'bot',
        message,
        question,
        timestamp: Date.now()
      }]);
      setIsTyping(false);
    }, 1000); // タイピング風の演出
  };

  const addUserMessage = (message) => {
    setChatHistory(prev => [...prev, {
      type: 'user',
      message,
      timestamp: Date.now()
    }]);
  };

  const handleAnswer = (questionId, value, optionLabel) => {
    const question = questions[currentStep];
    let newAnswers = { ...answers };
    let userMessage = '';
    
    if (question.type === 'multiple') {
      if (!newAnswers[questionId]) {
        newAnswers[questionId] = [];
      }
      if (newAnswers[questionId].includes(value)) {
        newAnswers[questionId] = newAnswers[questionId].filter(v => v !== value);
        // 選択解除の場合はメッセージを送信しない
        setAnswers(newAnswers);
        return;
      } else {
        newAnswers[questionId] = [...newAnswers[questionId], value];
      }
      
      // 複数選択でも即座に次に進む
      userMessage = question.options
        .filter(opt => [...newAnswers[questionId]].includes(opt.value))
        .map(opt => opt.label)
        .join('、');
    } else {
      newAnswers[questionId] = value;
      userMessage = optionLabel;
    }
    
    setAnswers(newAnswers);
    addUserMessage(userMessage);

    // 次の質問に進む
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        addBotMessage(questions[currentStep + 1].botMessage, questions[currentStep + 1]);
      } else {
        // 最後の質問完了
        addBotMessage('すべての質問にお答えいただき、ありがとうございました！\n\nあなたに最適な福祉サービスを検索しています...');
        setTimeout(() => {
          handleComplete();
        }, 2000);
      }
    }, 1000);
  };

  const handleMultipleConfirm = () => {
    const question = questions[currentStep];
    const selectedAnswers = answers[question.id] || [];
    const selectedLabels = question.options
      .filter(option => selectedAnswers.includes(option.value))
      .map(option => option.label);
    
    if (selectedLabels.length === 0) return;
    
    addUserMessage(selectedLabels.join('、'));
    
    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        addBotMessage(questions[currentStep + 1].botMessage, questions[currentStep + 1]);
      } else {
        addBotMessage('すべての質問にお答えいただき、ありがとうございました！\n\nあなたに最適な福祉サービスを検索しています...');
        setTimeout(() => {
          handleComplete();
        }, 2000);
      }
    }, 1000);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      // チャット履歴から最新のボット・ユーザーメッセージを削除
      setChatHistory(prev => {
        const newHistory = [...prev];
        // 最後のユーザーメッセージとボットメッセージを削除
        if (newHistory[newHistory.length - 1]?.type === 'bot') {
          newHistory.pop();
        }
        if (newHistory[newHistory.length - 1]?.type === 'user') {
          newHistory.pop();
        }
        return newHistory;
      });
    }
  };

  const restart = () => {
    setCurrentStep(0);
    setAnswers({});
    setChatHistory([]);
    setShowWelcome(false);
    // 最初の質問を再表示
    setTimeout(() => {
      addBotMessage(questions[0].botMessage, questions[0]);
    }, 500);
  };

  const handleComplete = () => {
    alert('質問が完了しました！結果画面に移動します。');
    console.log('回答結果:', answers);
  };

  const skipToResults = () => {
    alert('結果一覧画面に移動します！');
  };

  const toggleFontSize = () => {
    setFontSize(fontSize === 16 ? 20 : fontSize === 20 ? 24 : 16);
  };

  const currentQuestion = questions[currentStep];
  const canProceed = currentQuestion && (
    (currentQuestion.type === 'single' && answers[currentQuestion.id]) ||
    (currentQuestion.type === 'multiple' && answers[currentQuestion.id]?.length > 0)
  );

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white" style={{ fontSize: `${fontSize}px` }}>
        {/* ヘッダー */}
        <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">あきナビ福祉</h1>
                <p className="text-sm text-gray-600">狛江市の福祉サービス検索</p>
              </div>
            </div>
            <button
              onClick={toggleFontSize}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label={`文字サイズを変更（現在${fontSize}px）`}
            >
              <Type className="w-4 h-4" />
              <span className="text-sm font-medium">文字サイズ</span>
            </button>
          </div>
        </div>

        {/* ウェルカム画面 */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="text-blue-500 w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              こんにちは！<br />
              チャットで狛江市の福祉施設を探しましょう
            </h2>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              簡単な質問に答えるだけで、<br />
              狛江市内のあなたに最適な福祉サービス事業所をご案内します。
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => setShowWelcome(false)}
                className="w-full bg-blue-500 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-300"
                aria-label="チャットを開始する"
              >
                チャットを開始する
                <MessageCircle className="inline ml-2 w-5 h-5" />
              </button>
              
              <button
                onClick={skipToResults}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-300"
                aria-label="チャットをスキップして一覧を見る"
              >
                <SkipForward className="inline mr-2 w-5 h-5" />
                スキップして一覧を見る
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              質問は全部で{questions.length}問です（約2〜3分）
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ fontSize: `${fontSize}px` }}>
      {/* ヘッダー */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">あきナビ福祉チャット</h1>
              <p className="text-sm text-gray-600">質問 {currentStep + 1} / {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleFontSize}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              aria-label={`文字サイズを変更（現在${fontSize}px）`}
            >
              <Type className="w-4 h-4" />
              <span className="text-sm font-medium">文字サイズ</span>
            </button>
          </div>
        </div>
      </div>

      {/* チャットエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-2 max-w-xs sm:max-w-md ${chat.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {/* アバター */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  chat.type === 'user' ? 'bg-green-500' : 'bg-blue-500'
                }`}>
                  {chat.type === 'user' ? 
                    <User className="text-white w-5 h-5" /> : 
                    <Bot className="text-white w-5 h-5" />
                  }
                </div>
                
                {/* メッセージ */}
                <div className={`p-3 rounded-2xl ${
                  chat.type === 'user' 
                    ? 'bg-green-500 text-white rounded-tr-sm' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-tl-sm'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">
                    {chat.message}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* タイピングインジケーター */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="text-white w-5 h-5" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* 回答選択エリア */}
      {!isTyping && chatHistory.length > 0 && chatHistory[chatHistory.length - 1]?.question && (
        <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
          <div className="max-w-2xl mx-auto">
            <div className="grid gap-2">
              {chatHistory[chatHistory.length - 1].question.options.map((option) => {
                const question = chatHistory[chatHistory.length - 1].question;
                const isSelected = question.type === 'single' 
                  ? answers[question.id] === option.value
                  : answers[question.id]?.includes(option.value);

                return (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value, option.label)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-70 mt-1">{option.description}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 ${
                        isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 複数選択の場合の確定ボタン */}
            {chatHistory[chatHistory.length - 1]?.question?.type === 'multiple' && (
              <div className="mt-4">
                <button
                  onClick={handleMultipleConfirm}
                  disabled={!canProceed}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                    canProceed
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="inline mr-2 w-4 h-4" />
                  この内容で送信
                </button>
              </div>
            )}

            {/* ナビゲーションボタン */}
            <div className="flex justify-between items-center mt-4 gap-4">
              <div className="flex space-x-2">
                <button
                  onClick={goBack}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                    currentStep === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="inline mr-1 w-4 h-4" />
                  戻る
                </button>
                
                <button
                  onClick={skipToResults}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <SkipForward className="inline mr-1 w-4 h-4" />
                  スキップ
                </button>

                <button
                  onClick={restart}
                  className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-medium hover:bg-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  やり直す
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;