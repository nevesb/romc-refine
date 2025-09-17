import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Calculator, Coins } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface RefineData {
  fromLevel: number;
  toLevel: number;
  oriEluCost: number;
  eqCost: number;
  zenyCost: number;
}

const refineData: RefineData[] = [
  { fromLevel: 4, toLevel: 5, oriEluCost: 5, eqCost: 1, zenyCost: 100000 },
  { fromLevel: 5, toLevel: 6, oriEluCost: 10, eqCost: 2, zenyCost: 220000 },
  { fromLevel: 6, toLevel: 7, oriEluCost: 15, eqCost: 3, zenyCost: 470000 },
  { fromLevel: 7, toLevel: 8, oriEluCost: 25, eqCost: 4, zenyCost: 910000 },
  { fromLevel: 8, toLevel: 9, oriEluCost: 50, eqCost: 6, zenyCost: 1630000 },
  { fromLevel: 9, toLevel: 10, oriEluCost: 80, eqCost: 10, zenyCost: 2740000 },
  { fromLevel: 10, toLevel: 11, oriEluCost: 135, eqCost: 22, zenyCost: 5250000 },
  { fromLevel: 11, toLevel: 12, oriEluCost: 225, eqCost: 30, zenyCost: 9000000 },
  { fromLevel: 12, toLevel: 13, oriEluCost: 375, eqCost: 45, zenyCost: 14500000 },
  { fromLevel: 13, toLevel: 14, oriEluCost: 600, eqCost: 69, zenyCost: 24500000 },
  { fromLevel: 14, toLevel: 15, oriEluCost: 900, eqCost: 98, zenyCost: 42000000 },
];

export default function RefineCalculator() {
  const { t } = useLanguage();
  const [itemPrice, setItemPrice] = useState<string>("");
  const [oriEluPrice, setOriEluPrice] = useState<string>("");
  const [equipmentPrice, setEquipmentPrice] = useState<string>("");
  const [startLevel, setStartLevel] = useState<number>(4);
  const [targetLevel, setTargetLevel] = useState<number>(7);
  const [calculations, setCalculations] = useState<any[]>([]);

  const calculateRefineCost = () => {
    if (!oriEluPrice || !equipmentPrice) return;

    const oriEluCost = parseFloat(oriEluPrice);
    const eqPrice = parseFloat(equipmentPrice);
    
    if (isNaN(oriEluCost) || isNaN(eqPrice)) return;

    const results = [];
    let totalCost = 0;

    // Filtrar apenas os níveis relevantes
    const relevantRefines = refineData.filter(
      refine => refine.fromLevel >= startLevel && refine.toLevel <= targetLevel
    );

    for (const refine of relevantRefines) {
      const materialCost = (oriEluCost * refine.oriEluCost);
      const equipmentCost = (eqPrice * refine.eqCost);
      const levelCost = refine.zenyCost + materialCost + equipmentCost;
      
      totalCost += levelCost;

      results.push({
        fromLevel: refine.fromLevel,
        toLevel: refine.toLevel,
        oriEluNeeded: refine.oriEluCost,
        eqNeeded: refine.eqCost,
        zenyCost: refine.zenyCost,
        materialCost,
        equipmentCost,
        levelCost,
        cumulativeCost: totalCost
      });
    }

    setCalculations(results);
  };

  useEffect(() => {
    calculateRefineCost();
  }, [oriEluPrice, equipmentPrice, startLevel, targetLevel]);

  const formatZeny = (amount: number) => {
    return new Intl.NumberFormat('pt-BR').format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-bg p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow animate-float">
              <Calculator className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <div className="ml-4">
              <LanguageSelector />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            {t('app.subtitle')}
          </p>
          <div className="text-right mt-2">
            <p className="text-sm text-muted-foreground/70 italic">
              by Grimphos @ Classic Global
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <Card className="p-6 border-border/50 bg-card/90 backdrop-blur-sm">
            <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Sword className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">{t('form.title')}</h2>
          </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="oriEluPrice" className="text-sm font-medium">
                    {t('form.oriEluPrice')}
                  </Label>
                  <Input
                    id="oriEluPrice"
                    type="number"
                    placeholder={t('form.oriEluPrice.placeholder')}
                    value={oriEluPrice}
                    onChange={(e) => setOriEluPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="equipmentPrice" className="text-sm font-medium">
                    {t('form.equipmentPrice')}
                  </Label>
                  <Input
                    id="equipmentPrice"
                    type="number"
                    placeholder={t('form.equipmentPrice.placeholder')}
                    value={equipmentPrice}
                    onChange={(e) => setEquipmentPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="startLevel" className="text-sm font-medium">
                    {t('form.fromLevel')}
                  </Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[4, 5, 6, 7, 8, 9, 10, 11].map((level) => (
                      <Button
                        key={level}
                        variant={startLevel === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStartLevel(level)}
                        className={startLevel === level ? "bg-gradient-primary border-0" : ""}
                      >
                        +{level}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="targetLevel" className="text-sm font-medium">
                    {t('form.toLevel')}
                  </Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].filter(level => level > startLevel).map((level) => (
                      <Button
                        key={level}
                        variant={targetLevel === level ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTargetLevel(level)}
                        className={targetLevel === level ? "bg-gradient-primary border-0" : ""}
                      >
                        +{level}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Results Panel */}
          <Card className="lg:col-span-2 p-6 border-border/50 bg-card/90 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-5 h-5 text-golden" />
              <h2 className="text-xl font-semibold">{t('results.title')}</h2>
            </div>

            {calculations.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{t('results.totalCost')}</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {formatZeny(calculations[calculations.length - 1]?.cumulativeCost || 0)} z
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-golden/10 border border-golden/20">
                    <div className="flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-golden" />
                      <span className="text-sm font-medium">{t('results.oriEluTotal')}</span>
                    </div>
                    <p className="text-2xl font-bold text-golden">
                      {calculations.reduce((sum, calc) => sum + calc.oriEluNeeded, 0)} {t('results.units')}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <Sword className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium">{t('results.equipmentsTotal')}</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">
                      {calculations.reduce((sum, calc) => sum + calc.eqNeeded, 0)} {t('results.units')}
                    </p>
                  </div>

                  <div className="md:col-span-3 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-sm font-medium">{t('results.successGuarantee')}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('results.successText').replace('{startLevel}', startLevel.toString()).replace('{targetLevel}', targetLevel.toString())}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Desktop Table */}
                  <div className="hidden lg:block">
                    <table className="w-full text-sm table-fixed">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 w-24">{t('table.level')}</th>
                          <th className="text-center p-3 w-16">{t('table.oriElu')}</th>
                          <th className="text-center p-3 w-16">{t('table.equips')}</th>
                          <th className="text-right p-3 w-28">{t('table.materials')}</th>
                          <th className="text-right p-3 w-32">{t('table.equipments')}</th>
                          <th className="text-right p-3 w-24">{t('table.zeny')}</th>
                          <th className="text-right p-3 w-32">{t('table.total')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.map((calc, index) => (
                          <tr key={index} className="border-b border-border/30 hover:bg-muted/30">
                            <td className="p-3">
                              <Badge variant="outline" className="font-mono text-xs whitespace-nowrap">
                                +{calc.fromLevel} → +{calc.toLevel}
                              </Badge>
                            </td>
                            <td className="p-3 font-mono text-golden font-semibold text-center">{calc.oriEluNeeded}</td>
                            <td className="p-3 font-mono text-blue-400 font-semibold text-center">{calc.eqNeeded}</td>
                            <td className="p-3 font-mono text-accent text-right">{formatZeny(calc.materialCost)} z</td>
                            <td className="p-3 font-mono text-blue-300 text-right">{formatZeny(calc.eqNeeded * parseFloat(equipmentPrice || "0"))} z</td>
                            <td className="p-3 font-mono text-right">{formatZeny(calc.zenyCost)} z</td>
                            <td className="p-3 font-mono font-semibold text-primary text-right">{formatZeny(calc.cumulativeCost)} z</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="lg:hidden space-y-3">
                    {calculations.map((calc, index) => (
                      <div key={index} className="p-4 rounded-lg border border-border/50 bg-card/50">
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="font-mono">
                            +{calc.fromLevel} → +{calc.toLevel}
                          </Badge>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">{t('table.accumulated')}</div>
                            <div className="font-mono font-semibold text-primary">{formatZeny(calc.cumulativeCost)} z</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.oriElu')}</div>
                            <div className="font-mono text-golden font-semibold">{calc.oriEluNeeded}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.equipments')}</div>
                            <div className="font-mono text-blue-400 font-semibold">{calc.eqNeeded}</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.materialsCost')}</div>
                            <div className="font-mono text-accent text-xs">{formatZeny(calc.materialCost)} z</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.equipmentsCost')}</div>
                            <div className="font-mono text-blue-300 text-xs">{formatZeny(calc.eqNeeded * parseFloat(equipmentPrice || "0"))} z</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.zenyRaw')}</div>
                            <div className="font-mono text-xs">{formatZeny(calc.zenyCost)} z</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">{t('table.levelTotal')}</div>
                            <div className="font-mono font-semibold text-xs">{formatZeny(calc.levelCost)} z</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('placeholder.message')}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Footer Info */}
        <Card className="mt-6 p-4 border-border/50 bg-card/90 backdrop-blur-sm">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>{t('footer.title')}</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <p>{t('footer.info1')}</p>
              <p>{t('footer.info2')}</p>
              <p>{t('footer.info3')}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground/70">
                {t('footer.credits')} <strong>Grimphos @ Classic Global</strong>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}