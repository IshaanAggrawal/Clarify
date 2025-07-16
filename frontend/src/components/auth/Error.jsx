import { Eraser, Home, PenTool } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'

    function Error() {
        const navigate=useNavigate();
        return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
        {/* Paper background with subtle texture */}
        <div className="relative max-w-md w-full">
            {/* Paper sheet */}
            <div className="bg-card border-2 border-border rounded-lg shadow-lg p-8 relative overflow-hidden">
            {/* Notebook holes */}
            <div className="absolute left-6 top-8 bottom-8 w-px bg-destructive"></div>
            <div className="absolute left-4 top-12 w-2 h-2 bg-background border border-border rounded-full"></div>
            <div className="absolute left-4 top-20 w-2 h-2 bg-background border border-border rounded-full"></div>
            <div className="absolute left-4 bottom-20 w-2 h-2 bg-background border border-border rounded-full"></div>
            <div className="absolute left-4 bottom-12 w-2 h-2 bg-background border border-border rounded-full"></div>
            
            {/* Content area with margin */}
            <div className="ml-8 text-center">
                {/* Stationery icons */}
                <div className="flex justify-center items-center gap-4 mb-6">
                <PenTool className="text-primary w-8 h-8 rotate-12" />
                <Eraser className="text-muted-foreground w-6 h-6 -rotate-12" />
                </div>
                
                {/* 404 styled as handwritten */}
                <h1 className="text-6xl font-bold text-foreground mb-2 transform -rotate-1">
                404
                </h1>
                
                {/* Underline doodle */}
                <div className="w-20 h-1 bg-primary mx-auto mb-6 transform rotate-1 rounded-full"></div>
                
                {/* Message */}
                <p className="text-xl text-muted-foreground mb-2 transform rotate-0.5">
                Oops! Page not found
                </p>
                <p className="text-sm text-muted-foreground mb-8 italic">
                This page seems to have been erased...
                </p>
                
                {/* Home button styled as stationery */}
                <button className="transform -rotate-1 hover:rotate-0 transition-transform duration-200" onClick={() => navigate('/')}>
                <Link to="/" className="inline-flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Back to Home
                </Link>
                </button>
                
                {/* Doodles */}
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-muted rounded-full opacity-30"></div>
                <div className="absolute bottom-4 right-6 w-4 h-4 border-2 border-muted transform rotate-45 opacity-30"></div>
            </div>
            </div>
            
            {/* Paper shadow */}
            <div className="absolute inset-0 bg-muted/20 rounded-lg transform translate-x-1 translate-y-1 -z-10"></div>
        </div>
        </div>
    )
    }

    export default Error
