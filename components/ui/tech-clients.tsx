import { SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, SiPostgresql, SiMongodb, SiAmazon, SiVercel, SiStripe } from "react-icons/si";

export default function TechClients() {
    return (
        <section className="w-full py-16 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <h3 className="text-center text-3xl md:text-4xl font-bold text-white mb-4">You'll be in good company</h3>
                <p className="text-center text-zinc-400 mb-8 max-w-2xl mx-auto">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/airbnb.svg" alt="airbnb" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">airbnb</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/google.svg" alt="Google" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Google</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Microsoft</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/spotify.svg" alt="Spotify" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Spotify</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/amazon.svg" alt="Amazon" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Amazon</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/apple.svg" alt="Apple" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Apple</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/slack.svg" alt="Slack" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Slack</span>
                    </div>
                    <div className="flex flex-col items-center rounded-xl py-8 px-6 shadow hover:shadow-lg transition bg-gradient-to-br from-[#09090B] to-[#13131f] border border-[#27272a] hover:border-[#004be0]/30">
                        <img src="/logos/salesforce.svg" alt="Salesforce" className="h-8 mb-3 opacity-80" />
                        <span className="text-lg font-semibold text-zinc-200">Salesforce</span>
                    </div>
                </div>
            </div>
        </section>
    );
}