import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsRail() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<string>(() => {
    try {
      return localStorage.getItem("app-theme") || "theme1";
    } catch {
      return "theme1";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("app-theme", theme);
    } catch {}
    try {
      document.documentElement.setAttribute("data-theme", theme);
    } catch {}
  }, [theme]);

  return (
    <div className="hidden md:flex fixed right-3 top-[70%] -translate-y-1/2 flex-col items-center gap-2 z-40">
      <button
        aria-label="Ayarlar"
        onClick={() => setOpen(true)}
        className="h-11 w-11 grid place-items-center rounded-full bg-white/80 dark:bg-white/10 border border-white/30 shadow hover:shadow-md transition"
      >
        <Settings className="h-5 w-5" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Ayarlar</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="theme-select">Tema</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme-select" aria-label="Tema seçimi" className="mt-1">
                  <SelectValue placeholder="Tema seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theme1">Theme1</SelectItem>
                  <SelectItem value="theme2">theme2</SelectItem>
                  <SelectItem value="theme3">theme3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
