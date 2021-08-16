// Copyright 2021 Kirill Reunov. All rights reserved. MIT license.

/**
 * Deno FastWriter ✒
 * Fast & Safe file writer for Deno!
 */
export class FastWriter {

    /** Next data for writing. */
    private next: string | null;

    /** Lock writing. */
    private locked: boolean;

    /** Path to the file. */
    private readonly path: string;

    /** Path to the temporary file. */
    private readonly temp: string;

    /**
     * Fast Writer initialization.
     * @param path Path to the file.
     */
    constructor(path: string) {
        this.path = path;
        this.temp = this.path + '.temp';
        this.next = null;
        this.locked = false;
    }

    /**
     * Write data to the file.
     * @param data Data to write.
     */
    public write(data: string): void {
        this._write(data);
    }

    /**
     * Main writing method.
     * @param data Data to write. 
     */
    private async _write(data: string): Promise<void> {

        // Add data to the queue if writer is locked
        if (this.locked) {
            this.next = data;
            return;
        }

        // Lock writing
        this.locked = true;

        try {

            // Atomic writing
            await Deno.writeTextFile(this.temp, data);
            await Deno.rename(this.temp, this.path);

        } finally {
            this.locked = false;
        }

        // Start next writing
        if (this.next) {
            const nextData = this.next;
            this.next = null;
            this._write(nextData);
        }
    }
}
