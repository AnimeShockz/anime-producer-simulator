import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, Zap, Bot } from 'lucide-react';

const Index = () => {
  const [points, setPoints] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [autoClickers, setAutoClickers] = useState(0);
  const [purchasedClicks, setPurchasedClicks] = useState(0);

  useEffect(() => {
    if (autoClickers > 0) {
      const interval = setInterval(() => {
        setPoints(prev => prev + autoClickers * clickPower);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoClickers, clickPower]);

  const getClickPowerCost = () => {
    return Math.floor(10 * Math.pow(1.5, purchasedClicks));
  };

  const getAutoClickerCost = () => {
    return Math.floor(50 * Math.pow(2, autoClickers));
  };

  const handleBuyClickPower = () => {
    const cost = getClickPowerCost();
    if (points >= cost) {
      setPoints(prev => prev - cost);
      setClickPower(prev => prev + 1);
      setPurchasedClicks(prev => prev + 1);
    }
  };

  const handleBuyAutoClicker = () => {
    const cost = getAutoClickerCost();
    if (points >= cost) {
      setPoints(prev => prev - cost);
      setAutoClickers(prev => prev + 1);
    }
  };

  const handleClick = () => {
    setPoints(prev => prev + clickPower);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-800">Clicker Game</CardTitle>
          <CardDescription className="text-gray-600">Click the button to earn points!</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-purple-600 mb-2">{points.toLocaleString()}</div>
            <div className="text-sm text-gray-500">POINTS</div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleClick}
              className="h-32 w-32 rounded-full text-xl font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 transform active:scale-95 transition-transform shadow-lg"
            >
              CLICK ME!
              <ArrowUpRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-bold text-gray-800">{clickPower}</div>
              <div className="text-xs text-gray-500">Click Power</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-lg font-bold text-gray-800">{autoClickers}</div>
              <div className="text-xs text-gray-500">Auto Clickers</div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleBuyClickPower}
              disabled={points < getClickPowerCost()}
              className="w-full justify-between"
              variant={points >= getClickPowerCost() ? "default" : "secondary"}
            >
              <span className="flex items-center gap-2"><Zap className="h-4 w-4" />Increase Click Power</span>
              <span className="font-bold">{getClickPowerCost().toLocaleString()}</span>
            </Button>

            <Button
              onClick={handleBuyAutoClicker}
              disabled={points < getAutoClickerCost()}
              className="w-full justify-between"
              variant={points >= getAutoClickerCost() ? "default" : "secondary"}
            >
              <span className="flex items-center gap-2"><Bot className="h-4 w-4" />Buy Auto Clicker</span>
              <span className="font-bold">{getAutoClickerCost().toLocaleString()}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;