import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, QrCode } from "lucide-react";

const TOPICS = [
  { value: "genel", label: "Genel Destek" },
  { value: "rezervasyon", label: "Rezervasyon" },
  { value: "odeme", label: "Ödeme" },
  { value: "iptal-iade", label: "İptal / İade" },
  { value: "transfer", label: "Transfer" },
  { value: "ucak-bileti", label: "Uçak Bileti" },
  { value: "tur", label: "Tur Bilgisi" },
  { value: "diger", label: "Diğer" },
];

export default function SupportModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [topic, setTopic] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hotel, setHotel] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"form" | "success">("form");

  const reset = () => {
    setTopic("");
    setName("");
    setEmail("");
    setPhone("");
    setHotel("");
    setMessage("");
    setStep("form");
  };

  const supportPhone = "905558449901"; // +90 555 844 99 01

  const waText = useMemo(() => {
    const parts = [
      topic ? `Konu: ${TOPICS.find((t) => t.value === topic)?.label}` : "",
      name ? `Ad Soyad: ${name}` : "",
      email ? `E-posta: ${email}` : "",
      phone ? `Telefon: ${phone}` : "",
      hotel ? `Konaklanan Otel: ${hotel}` : "",
      message ? `Mesaj: ${message}` : "",
    ].filter(Boolean);
    return parts.join("\n");
  }, [topic, name, email, phone, hotel, message]);

  const waLink = useMemo(() => {
    const base = `https://wa.me/${supportPhone}`;
    const textParam = waText ? `?text=${encodeURIComponent(waText)}` : "";
    return `${base}${textParam}`;
  }, [waText]);

  const qrUrl = useMemo(() => {
    const data = encodeURIComponent(waLink);
    const bg = "ffffff";
    const color = "000000";
    return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${data}&bgcolor=${bg}&color=${color}&margin=1`;
  }, [waLink]);

  const canSubmit = topic && name && email && phone && hotel && message;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStep("success");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 150);
      }}
    >
      <DialogContent className="w-[95vw] max-w-3xl">
        <DialogHeader>
          <DialogTitle>Destek Talebi</DialogTitle>
        </DialogHeader>

        {step === "form" && (
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="topic">Konu Başlığı</Label>
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger id="topic" aria-label="Konu Başlığı">
                      <SelectValue placeholder="Konu seçiniz" />
                    </SelectTrigger>
                    <SelectContent>
                      {TOPICS.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Ad Soyad</Label>
                    <Input
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">E-posta Adresi</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@eposta.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefon Numarası</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xx xxx xx xx"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hotel">Konaklanan Otel Bilgisi</Label>
                    <Input
                      id="hotel"
                      required
                      value={hotel}
                      onChange={(e) => setHotel(e.target.value)}
                      placeholder="Otel adı"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mesajınız</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Talebinizi detaylandırın"
                  />
                </div>
              </div>

              <div className="md:col-span-1">
                <div className="rounded-md border bg-white/60 dark:bg-white/5 p-4 h-full flex flex-col items-center justify-center text-center">
                  <div className="flex items-center gap-2 font-medium">
                    <QrCode className="h-4 w-4" /> WhatsApp QR
                  </div>
                  <img
                    src={qrUrl}
                    alt="WhatsApp QR"
                    width={180}
                    height={180}
                    className="mt-3 rounded bg-white"
                  />
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center justify-center rounded-md bg-brand text-white px-3 py-2 text-sm font-semibold hover:brightness-110"
                  >
                    WhatsApp'ta Aç
                  </a>
                  <p className="mt-2 text-xs text-slate-500">
                    QR kodu taradığınızda WhatsApp açılır.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                İptal
              </Button>
              <Button
                type="submit"
                className="bg-brand text-white"
                disabled={!canSubmit}
              >
                Gönder
              </Button>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="py-8 flex flex-col items-center text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Mesaj gönderildi</h3>
            <p className="mt-2 text-slate-500 text-sm max-w-md">
              Talebiniz bize ulaştı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-brand text-white px-4 py-2 text-sm font-semibold hover:brightness-110"
              >
                WhatsApp üzerinden devam et
              </a>
              <Button onClick={() => onOpenChange(false)} variant="outline">
                Kapat
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
