import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções
const translations = {
  pt: {
    'app.title': 'Calculadora de Refino',
    'app.subtitle': 'Calcule o custo total para refinar seus equipamentos',
    'language.portuguese': 'Português',
    'language.english': 'English',
    'form.title': 'Configurações (100% Garantido)',
    'form.oriEluPrice': 'Preço do Ori/Elu (Zeny)',
    'form.oriEluPrice.placeholder': 'Ex: 150000',
    'form.equipmentPrice': 'Preço do Equipamento (Zeny)',
    'form.equipmentPrice.placeholder': 'Ex: 50000',
    'form.fromLevel': 'Nível Inicial',
    'form.toLevel': 'Nível Alvo',
    'table.level': 'Nível',
    'table.oriElu': 'Ori/Elu',
    'table.equips': 'Equips',
    'table.materials': 'Materiais',
    'table.equipments': 'Equipamentos',
    'table.zeny': 'Zeny',
    'table.total': 'Total',
    'table.accumulated': 'Acumulado',
    'table.materialsCost': 'Custo Materiais',
    'table.equipmentsCost': 'Custo Equipamentos',
    'table.zenyRaw': 'Zeny Raw',
    'table.levelTotal': 'Total Nível',
    'results.title': 'Custo Total (100% Garantido)',
    'results.totalCost': 'Custo Total',
    'results.oriEluTotal': 'Ori/Elu Total',
    'results.equipmentsTotal': 'Equipamentos Total',
    'results.successGuarantee': 'Garantia de Sucesso',
    'results.successText': '100% de sucesso garantido | De +{startLevel} para +{targetLevel}',
    'results.units': 'unidades',
    'placeholder.message': 'Insira o preço do Ori/Elu para calcular o custo garantido de refino',
    'footer.title': 'Refino com 100% de garantia de sucesso:',
    'footer.info1': '• Valores baseados na tabela "Normal Cost" oficial',
    'footer.info2': '• Sem risco de perder o item ou materiais',
    'footer.info3': '• Custo total = Zeny + (Ori/Elu × preço) + (Equipamentos × preço)',
    'footer.credits': 'Créditos:',
  },
  en: {
    'app.title': 'Refine Calculator',
    'app.subtitle': 'Calculate the total cost to refine your equipment',
    'language.portuguese': 'Português',
    'language.english': 'English',
    'form.title': 'Settings (100% Guaranteed)',
    'form.oriEluPrice': 'Ori/Elu Price (Zeny)',
    'form.oriEluPrice.placeholder': 'Ex: 150000',
    'form.equipmentPrice': 'Equipment Price (Zeny)',
    'form.equipmentPrice.placeholder': 'Ex: 50000',
    'form.fromLevel': 'From Level',
    'form.toLevel': 'To Level',
    'table.level': 'Level',
    'table.oriElu': 'Ori/Elu',
    'table.equips': 'Equips',
    'table.materials': 'Materials',
    'table.equipments': 'Equipment',
    'table.zeny': 'Zeny',
    'table.total': 'Total',
    'table.accumulated': 'Accumulated',
    'table.materialsCost': 'Materials Cost',
    'table.equipmentsCost': 'Equipment Cost',
    'table.zenyRaw': 'Raw Zeny',
    'table.levelTotal': 'Level Total',
    'results.title': 'Total Cost (100% Guaranteed)',
    'results.totalCost': 'Total Cost',
    'results.oriEluTotal': 'Ori/Elu Total',
    'results.equipmentsTotal': 'Equipment Total',
    'results.successGuarantee': 'Success Guarantee',
    'results.successText': '100% guaranteed success | From +{startLevel} to +{targetLevel}',
    'results.units': 'units',
    'placeholder.message': 'Enter the Ori/Elu price to calculate the guaranteed refine cost',
    'footer.title': '100% guaranteed success refining:',
    'footer.info1': '• Values based on official "Normal Cost" table',
    'footer.info2': '• No risk of losing items or materials',
    'footer.info3': '• Total cost = Zeny + (Ori/Elu × price) + (Equipment × price)',
    'footer.credits': 'Credits:',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};