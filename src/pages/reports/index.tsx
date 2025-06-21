import { useState } from "react"
import { CalendarDays, Download, FileText, Filter, Search, Users } from "lucide-react"
import { Sidebar } from '@/components/sidebar';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

export function Reports() {
    const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})

    const reportTypes = [
        {
            id: "students",
            title: "Relatório de Alunos",
            description: "Lista de alunos por graduação, idade ou status",
            icon: Users,
            color: "bg-blue-500",
        },
        {
            id: "attendance",
            title: "Relatório de Frequência",
            description: "Controle de presença dos alunos nas aulas",
            icon: CalendarDays,
            color: "bg-green-500",
        },
        {
            id: "financial",
            title: "Relatório Financeiro",
            description: "Mensalidades, pagamentos e inadimplência",
            icon: FileText,
            color: "bg-yellow-500",
        },
    ]

    const graduations = [
        "Faixa Branca",
        "Faixa Amarela",
        "Faixa Laranja",
        "Faixa Verde",
        "Faixa Azul",
        "Faixa Marrom",
        "Faixa Preta 1º Dan",
        "Faixa Preta 2º Dan",
        "Faixa Preta 3º Dan",
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <Sidebar />
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
                            <p className="text-gray-600 mt-1">Academia de Taekwondo - Sistema de Relatórios</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                🥋 Taekwondo
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Report Type Selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reportTypes.map((report) => {
                        const Icon = report.icon
                        return (
                            <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${report.color}`}>
                                            <Icon className="h-5 w-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{report.title}</CardTitle>
                                        </div>
                                    </div>
                                    <CardDescription>{report.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        )
                    })}
                </div>

                {/* Main Report Configuration */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Filters Panel */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Filter className="h-5 w-5" />
                                    Filtros
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Report Type */}
                                <div className="space-y-2">
                                    <Label>Tipo de Relatório</Label>
                                    <Select defaultValue="students">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="students">Relatório de Alunos</SelectItem>
                                            <SelectItem value="attendance">Relatório de Frequência</SelectItem>
                                            <SelectItem value="financial">Relatório Financeiro</SelectItem>
                                            <SelectItem value="graduations">Relatório de Graduações</SelectItem>
                                            <SelectItem value="events">Relatório de Eventos</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Date Range */}
                                <div className="space-y-2">
                                    <Label>Período</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start text-left">
                                                <CalendarDays className="mr-2 h-4 w-4" />
                                                Selecionar período
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="range" numberOfMonths={2} selected={dateRange} onSelect={setDateRange} />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* Graduation Filter */}
                                <div className="space-y-2">
                                    <Label>Graduação</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todas as graduações" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as graduações</SelectItem>
                                            {graduations.map((grad) => (
                                                <SelectItem key={grad} value={grad.toLowerCase().replace(/\s+/g, "-")}>
                                                    {grad}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Age Group */}
                                <div className="space-y-2">
                                    <Label>Faixa Etária</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todas as idades" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Todas as idades</SelectItem>
                                            <SelectItem value="kids">Infantil (4-12 anos)</SelectItem>
                                            <SelectItem value="teens">Juvenil (13-17 anos)</SelectItem>
                                            <SelectItem value="adults">Adulto (18+ anos)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Status Filter */}
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="active" defaultChecked />
                                            <Label htmlFor="active">Alunos Ativos</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="inactive" />
                                            <Label htmlFor="inactive">Alunos Inativos</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="pending" />
                                            <Label htmlFor="pending">Pendências</Label>
                                        </div>
                                    </div>
                                </div>

                                <Separator />

                                {/* Generate Button */}
                                <Button className="w-full" size="lg">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Gerar Relatório
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Report Preview */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Prévia do Relatório</CardTitle>
                                        <CardDescription>Relatório de Alunos - Todas as Graduações</CardDescription>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Search className="mr-2 h-4 w-4" />
                                            Buscar
                                        </Button>
                                        <Button size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            Exportar
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="table" className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="table">Tabela</TabsTrigger>
                                        <TabsTrigger value="summary">Resumo</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="table" className="mt-4">
                                        <div className="border rounded-lg overflow-hidden">
                                            <div className="bg-gray-50 px-4 py-3 border-b">
                                                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-700">
                                                    <div>Nome</div>
                                                    <div>Graduação</div>
                                                    <div>Idade</div>
                                                    <div>Status</div>
                                                </div>
                                            </div>
                                            <div className="divide-y">
                                                {[
                                                    { name: "Ana Silva", graduation: "Faixa Azul", age: 16, status: "Ativo" },
                                                    { name: "Carlos Santos", graduation: "Faixa Preta 1º Dan", age: 28, status: "Ativo" },
                                                    { name: "Maria Oliveira", graduation: "Faixa Verde", age: 12, status: "Ativo" },
                                                    { name: "João Costa", graduation: "Faixa Marrom", age: 22, status: "Pendente" },
                                                    { name: "Pedro Lima", graduation: "Faixa Amarela", age: 8, status: "Ativo" },
                                                ].map((student, index) => (
                                                    <div key={index} className="px-4 py-3">
                                                        <div className="grid grid-cols-4 gap-4 text-sm">
                                                            <div className="font-medium">{student.name}</div>
                                                            <div>{student.graduation}</div>
                                                            <div>{student.age} anos</div>
                                                            <div>
                                                                <Badge
                                                                    variant={student.status === "Ativo" ? "default" : "secondary"}
                                                                    className={
                                                                        student.status === "Ativo"
                                                                            ? "bg-green-100 text-green-800"
                                                                            : "bg-yellow-100 text-yellow-800"
                                                                    }
                                                                >
                                                                    {student.status}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="summary" className="mt-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold text-blue-600">127</div>
                                                    <div className="text-sm text-gray-600">Total de Alunos</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold text-green-600">115</div>
                                                    <div className="text-sm text-gray-600">Alunos Ativos</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold text-yellow-600">8</div>
                                                    <div className="text-sm text-gray-600">Pendências</div>
                                                </CardContent>
                                            </Card>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="text-2xl font-bold text-red-600">4</div>
                                                    <div className="text-sm text-gray-600">Inativos</div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <h3 className="text-lg font-semibold">Distribuição por Graduação</h3>
                                            <div className="space-y-2">
                                                {[
                                                    { grad: "Faixa Branca", count: 25, percentage: 20 },
                                                    { grad: "Faixa Amarela", count: 22, percentage: 17 },
                                                    { grad: "Faixa Verde", count: 18, percentage: 14 },
                                                    { grad: "Faixa Azul", count: 15, percentage: 12 },
                                                    { grad: "Faixa Marrom", count: 12, percentage: 9 },
                                                    { grad: "Faixa Preta", count: 35, percentage: 28 },
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                                            <span className="font-medium">{item.grad}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm text-gray-600">{item.count} alunos</span>
                                                            <Badge variant="outline">{item.percentage}%</Badge>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
