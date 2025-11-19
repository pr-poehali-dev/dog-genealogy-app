import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';

interface DogData {
  name: string;
  breed: string;
  birthDate: string;
  photo: string;
  father: {
    name: string;
    birthDate: string;
  };
  mother: {
    name: string;
    birthDate: string;
  };
  grandparents: {
    paternalGrandfather: { name: string; birthDate: string };
    paternalGrandmother: { name: string; birthDate: string };
    maternalGrandfather: { name: string; birthDate: string };
    maternalGrandmother: { name: string; birthDate: string };
  };
  health: number;
  awards: number;
}

const PedigreeCanvas = ({ data }: { data: DogData }) => {
  return (
    <div 
      id="pedigree-canvas" 
      className="bg-white w-[1050px] h-[1050px] flex items-center justify-center p-12 relative"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <line x1="525" y1="525" x2="350" y2="300" stroke="#000" strokeWidth="2" />
        <line x1="525" y1="525" x2="700" y2="300" stroke="#000" strokeWidth="2" />
        
        <line x1="350" y1="300" x2="200" y2="150" stroke="#000" strokeWidth="2" />
        <line x1="350" y1="300" x2="200" y2="450" stroke="#000" strokeWidth="2" />
        
        <line x1="700" y1="300" x2="850" y2="150" stroke="#000" strokeWidth="2" />
        <line x1="700" y1="300" x2="850" y2="450" stroke="#000" strokeWidth="2" />
      </svg>

      <div className="absolute top-12 left-[100px] text-center w-[200px]">
        <div className="text-sm font-semibold uppercase tracking-wide">{data.grandparents.paternalGrandfather.name || 'ДЕДУШКА ПО ОТЦУ'}</div>
        <div className="text-xs mt-1">{data.grandparents.paternalGrandfather.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-[370px] left-[100px] text-center w-[200px]">
        <div className="text-sm font-semibold uppercase tracking-wide">{data.grandparents.paternalGrandmother.name || 'БАБУШКА ПО ОТЦУ'}</div>
        <div className="text-xs mt-1">{data.grandparents.paternalGrandmother.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-12 right-[100px] text-center w-[200px]">
        <div className="text-sm font-semibold uppercase tracking-wide">{data.grandparents.maternalGrandfather.name || 'ДЕДУШКА ПО МАТЕРИ'}</div>
        <div className="text-xs mt-1">{data.grandparents.maternalGrandfather.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-[370px] right-[100px] text-center w-[200px]">
        <div className="text-sm font-semibold uppercase tracking-wide">{data.grandparents.maternalGrandmother.name || 'БАБУШКА ПО МАТЕРИ'}</div>
        <div className="text-xs mt-1">{data.grandparents.maternalGrandmother.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-[220px] left-[250px] text-center w-[200px]">
        <div className="text-base font-semibold uppercase tracking-wide">{data.father.name || 'ОТЕЦ'}</div>
        <div className="text-sm mt-1">{data.father.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-[220px] right-[250px] text-center w-[200px]">
        <div className="text-base font-semibold uppercase tracking-wide">{data.mother.name || 'МАТЬ'}</div>
        <div className="text-sm mt-1">{data.mother.birthDate || 'ДР: XX.XX.XXXX'}</div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center" style={{ zIndex: 10 }}>
        {data.photo ? (
          <div className="w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-black mx-auto bg-white">
            <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-full bg-gray-200 mb-4 border-4 border-black mx-auto flex items-center justify-center">
            <Icon name="Dog" size={80} className="text-gray-400" />
          </div>
        )}
        <div className="text-2xl font-bold uppercase tracking-wider">{data.name || 'КЛИЧКА'}</div>
        <div className="text-base mt-2">{data.breed || 'ПОРОДА'}</div>
        <div className="text-sm mt-1">{data.birthDate || 'ДР: XX.XX.XXXX'}</div>
        
        <div className="flex gap-8 justify-center mt-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-2xl">{i < data.health ? '❤️' : '🤍'}</span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-2xl">{i < data.awards ? '🏆' : '⚪'}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [dogData, setDogData] = useState<DogData>({
    name: '',
    breed: '',
    birthDate: '',
    photo: '',
    father: { name: '', birthDate: '' },
    mother: { name: '', birthDate: '' },
    grandparents: {
      paternalGrandfather: { name: '', birthDate: '' },
      paternalGrandmother: { name: '', birthDate: '' },
      maternalGrandfather: { name: '', birthDate: '' },
      maternalGrandmother: { name: '', birthDate: '' },
    },
    health: 0,
    awards: 0,
  });

  const [savedPedigrees, setSavedPedigrees] = useState<DogData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDogData({ ...dogData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const exportToPNG = async () => {
    const canvas = document.getElementById('pedigree-canvas');
    if (canvas) {
      try {
        const imageCanvas = await html2canvas(canvas, {
          width: 1050,
          height: 1050,
          scale: 2,
          backgroundColor: '#ffffff',
        });
        
        const link = document.createElement('a');
        link.download = `${dogData.name || 'pedigree'}_родословная.png`;
        link.href = imageCanvas.toDataURL('image/png');
        link.click();
        
        toast.success('Родословная успешно экспортирована!');
      } catch (error) {
        toast.error('Ошибка при экспорте');
      }
    }
  };

  const savePedigree = () => {
    if (!dogData.name) {
      toast.error('Укажите кличку собаки');
      return;
    }
    setSavedPedigrees([...savedPedigrees, { ...dogData }]);
    toast.success('Родословная сохранена в галерею!');
  };

  const loadPedigree = (pedigree: DogData) => {
    setDogData(pedigree);
    toast.success('Родословная загружена!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Icon name="Dog" size={48} />
            Родословная собаки
          </h1>
          <p className="text-gray-600">Создайте красивую родословную для вашего питомца</p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="create">
              <Icon name="Edit" size={18} className="mr-2" />
              Создание
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Icon name="Eye" size={18} className="mr-2" />
              Предпросмотр
            </TabsTrigger>
            <TabsTrigger value="gallery">
              <Icon name="Images" size={18} className="mr-2" />
              Галерея ({savedPedigrees.length})
            </TabsTrigger>
            <TabsTrigger value="instructions">
              <Icon name="BookOpen" size={18} className="mr-2" />
              Инструкция
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name="User" size={20} />
                      Основная информация
                    </h3>
                    
                    <div>
                      <Label htmlFor="name">Кличка собаки *</Label>
                      <Input
                        id="name"
                        placeholder="Шопен"
                        value={dogData.name}
                        onChange={(e) => setDogData({ ...dogData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="breed">Порода</Label>
                      <Input
                        id="breed"
                        placeholder="Бордер-колли"
                        value={dogData.breed}
                        onChange={(e) => setDogData({ ...dogData, breed: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="birthDate">Дата рождения</Label>
                      <Input
                        id="birthDate"
                        placeholder="ДР: 30.02.22"
                        value={dogData.birthDate}
                        onChange={(e) => setDogData({ ...dogData, birthDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Фото собаки</Label>
                      <div className="flex gap-2">
                        <Input
                          type="file"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full"
                        >
                          <Icon name="Upload" size={18} className="mr-2" />
                          Загрузить фото
                        </Button>
                      </div>
                      {dogData.photo && (
                        <div className="mt-2">
                          <img src={dogData.photo} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <Label>Здоровье (0-3)</Label>
                      <div className="flex gap-2 mt-2">
                        {[0, 1, 2, 3].map((num) => (
                          <Button
                            key={num}
                            variant={dogData.health === num ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setDogData({ ...dogData, health: num })}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Награды (0-3)</Label>
                      <div className="flex gap-2 mt-2">
                        {[0, 1, 2, 3].map((num) => (
                          <Button
                            key={num}
                            variant={dogData.awards === num ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setDogData({ ...dogData, awards: num })}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name="Users" size={20} />
                      Родители
                    </h3>
                    
                    <div>
                      <Label htmlFor="fatherName">Кличка отца</Label>
                      <Input
                        id="fatherName"
                        placeholder="Клички отца"
                        value={dogData.father.name}
                        onChange={(e) => setDogData({
                          ...dogData,
                          father: { ...dogData.father, name: e.target.value }
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="fatherBirth">Дата рождения отца</Label>
                      <Input
                        id="fatherBirth"
                        placeholder="ДР: XX.XX.XX"
                        value={dogData.father.birthDate}
                        onChange={(e) => setDogData({
                          ...dogData,
                          father: { ...dogData.father, birthDate: e.target.value }
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="motherName">Кличка матери</Label>
                      <Input
                        id="motherName"
                        placeholder="Клички матери"
                        value={dogData.mother.name}
                        onChange={(e) => setDogData({
                          ...dogData,
                          mother: { ...dogData.mother, name: e.target.value }
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="motherBirth">Дата рождения матери</Label>
                      <Input
                        id="motherBirth"
                        placeholder="ДР: XX.XX.XX"
                        value={dogData.mother.birthDate}
                        onChange={(e) => setDogData({
                          ...dogData,
                          mother: { ...dogData.mother, birthDate: e.target.value }
                        })}
                      />
                    </div>

                    <h3 className="font-semibold text-lg flex items-center gap-2 pt-4">
                      <Icon name="Users" size={20} />
                      Бабушки и дедушки
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Дед по отцу</Label>
                        <Input
                          placeholder="Кличка"
                          className="text-sm"
                          value={dogData.grandparents.paternalGrandfather.name}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              paternalGrandfather: { ...dogData.grandparents.paternalGrandfather, name: e.target.value }
                            }
                          })}
                        />
                        <Input
                          placeholder="ДР"
                          className="text-sm mt-1"
                          value={dogData.grandparents.paternalGrandfather.birthDate}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              paternalGrandfather: { ...dogData.grandparents.paternalGrandfather, birthDate: e.target.value }
                            }
                          })}
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Бабушка по отцу</Label>
                        <Input
                          placeholder="Кличка"
                          className="text-sm"
                          value={dogData.grandparents.paternalGrandmother.name}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              paternalGrandmother: { ...dogData.grandparents.paternalGrandmother, name: e.target.value }
                            }
                          })}
                        />
                        <Input
                          placeholder="ДР"
                          className="text-sm mt-1"
                          value={dogData.grandparents.paternalGrandmother.birthDate}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              paternalGrandmother: { ...dogData.grandparents.paternalGrandmother, birthDate: e.target.value }
                            }
                          })}
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Дед по матери</Label>
                        <Input
                          placeholder="Кличка"
                          className="text-sm"
                          value={dogData.grandparents.maternalGrandfather.name}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              maternalGrandfather: { ...dogData.grandparents.maternalGrandfather, name: e.target.value }
                            }
                          })}
                        />
                        <Input
                          placeholder="ДР"
                          className="text-sm mt-1"
                          value={dogData.grandparents.maternalGrandfather.birthDate}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              maternalGrandfather: { ...dogData.grandparents.maternalGrandfather, birthDate: e.target.value }
                            }
                          })}
                        />
                      </div>

                      <div>
                        <Label className="text-xs">Бабушка по матери</Label>
                        <Input
                          placeholder="Кличка"
                          className="text-sm"
                          value={dogData.grandparents.maternalGrandmother.name}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              maternalGrandmother: { ...dogData.grandparents.maternalGrandmother, name: e.target.value }
                            }
                          })}
                        />
                        <Input
                          placeholder="ДР"
                          className="text-sm mt-1"
                          value={dogData.grandparents.maternalGrandmother.birthDate}
                          onChange={(e) => setDogData({
                            ...dogData,
                            grandparents: {
                              ...dogData.grandparents,
                              maternalGrandmother: { ...dogData.grandparents.maternalGrandmother, birthDate: e.target.value }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={savePedigree} className="flex-1">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить в галерею
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="overflow-auto border-2 border-gray-300 rounded-lg" style={{ maxWidth: '100%' }}>
                    <div style={{ transform: 'scale(0.7)', transformOrigin: 'top center' }}>
                      <PedigreeCanvas data={dogData} />
                    </div>
                  </div>
                  
                  <Button onClick={exportToPNG} size="lg" className="w-full md:w-auto">
                    <Icon name="Download" size={20} className="mr-2" />
                    Экспортировать PNG (1050×1050px)
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center">
                    Размер идеально подходит для печати на кружке
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardContent className="pt-6">
                {savedPedigrees.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Icon name="Images" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Галерея пуста. Создайте и сохраните вашу первую родословную!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPedigrees.map((pedigree, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div onClick={() => loadPedigree(pedigree)}>
                          {pedigree.photo && (
                            <div className="h-40 overflow-hidden bg-gray-100">
                              <img src={pedigree.photo} alt={pedigree.name} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <CardContent className="pt-4">
                            <h3 className="font-semibold text-lg">{pedigree.name}</h3>
                            <p className="text-sm text-gray-500">{pedigree.breed}</p>
                            <p className="text-xs text-gray-400 mt-1">{pedigree.birthDate}</p>
                            <Button variant="outline" size="sm" className="w-full mt-3">
                              <Icon name="Eye" size={16} className="mr-2" />
                              Загрузить
                            </Button>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card>
              <CardContent className="pt-6 prose max-w-none">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Icon name="BookOpen" size={28} />
                  Как создать родословную
                </h2>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h3 className="font-semibold">Заполните основную информацию</h3>
                      <p className="text-gray-600">Укажите кличку, породу и дату рождения собаки. Загрузите фото питомца.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h3 className="font-semibold">Добавьте данные о родителях</h3>
                      <p className="text-gray-600">Внесите клички и даты рождения отца и матери.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h3 className="font-semibold">Укажите бабушек и дедушек</h3>
                      <p className="text-gray-600">Заполните информацию о всех четырех бабушках и дедушках по отцовской и материнской линии.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h3 className="font-semibold">Добавьте здоровье и награды</h3>
                      <p className="text-gray-600">Выберите количество сердечек (здоровье) и кубков (награды) от 0 до 3.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">5</div>
                    <div>
                      <h3 className="font-semibold">Сохраните и экспортируйте</h3>
                      <p className="text-gray-600">Сохраните родословную в галерею или перейдите в раздел "Предпросмотр" и экспортируйте изображение размером 1050×1050px для печати на кружке.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    <Icon name="Lightbulb" size={20} />
                    Совет
                  </h3>
                  <p className="text-sm text-gray-700">
                    Для лучшего результата используйте квадратное фото собаки с хорошим освещением. 
                    Экспортированное изображение идеально подходит для печати на стандартных кружках!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
